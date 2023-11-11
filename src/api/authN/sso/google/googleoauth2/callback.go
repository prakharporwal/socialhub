package googleoauth2

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/prakharporwal/bank-server/api/apierror"
	"net/http"
	"socialhub-server/pkg/plogger"
)

func SignUpCallback(ctx *gin.Context) {
	plogger.Info("Error logger!")
	var obj interface{}
	ctx.ShouldBindJSON(&obj)
	str := ctx.Param("hashParam")
	plogger.Info(str)
	val, ok := ctx.GetQuery("flowName")
	if !ok {
		plogger.Info("not present")
	}
	token, ok := ctx.GetQuery("access_token")
	if !ok {
		plogger.Info("not present")
	}
	plogger.Info(val)
	plogger.Info("token :", token)

	// take the oauth token
	// use it to get the user accessToken
	// use accessToken to get the user details
	// use these details to create a new user or signin the user by giving him a jwtToken back

	ctx.JSON(http.StatusTemporaryRedirect, gin.H{"message": "google signin!"})
}

type reqBody struct {
	AccessToken string `json:"access_token""`
}

func FetchUserEmailFromGoogle(ctx *gin.Context) {
	var body reqBody
	err := ctx.ShouldBindJSON(&body)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	req, _ := http.NewRequest("GET", "https://www.googleapis.com/oauth2/v2/userinfo", nil)
	req.Header.Add("Authorization", "Bearer "+body.AccessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting user info from Google ", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		plogger.Error("Request Failed: user info from Google ", resp.StatusCode)
		var rbody interface{}
		json.NewDecoder(resp.Body).Decode(&rbody)
		plogger.Error(rbody)
	}

	var respBody struct {
		Id            string `json:"id"`
		Email         string `json:"email"`
		VerifiedEmail bool   `json:"verified_email"`
		GivenName     string `json:"given_name"`
		Name          string `json:"name"`
		FamilyName    string `json:"family_name"`
		Picture       string `json:"picture"`
		Locale        string `json:"locale"`
	}

	err = json.NewDecoder(resp.Body).Decode(&respBody)
	if err != nil {
		plogger.Error("Failed JSON decoding of response ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
		return
	}
	plogger.Info(respBody.Name)

	ctx.JSON(http.StatusOK, gin.H{"message": "user is authenticated", "user_email": respBody.Email})

	// generate jwt token for session management
	//
}
