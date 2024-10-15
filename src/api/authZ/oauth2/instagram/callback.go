package instagram

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/api/authZ"
	"socialhub-server/env"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
)

const ERROR = "error"
const ERROR_DESCRIPTION = "error_description"
const LINKEDIN_ACCESS_TOKEN_REQUEST_URL = "https://www.linkedin.com/oauth/v2/accessToken"

// GetAccessToken
// use the authorization code to get the access code
func OAuth2Callback(ctx *gin.Context) {
	//code, clientID, clientSecret, redirectURI string, grant_type,
	//set up the HTTP POST request to exchange the authorization code for an access token
	errParam, ok := ctx.GetQuery(ERROR)
	if ok {
		errDescription, _ := ctx.Params.Get(ERROR_DESCRIPTION)
		plogger.Error("oauth callback failed!", errParam, errDescription)
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Something went wrong!"})
		return
	}

	state, ok := ctx.GetQuery("state")
	if !ok {
		plogger.Error("state value missing! the oauth process failed due to this ! cannot check for! CSRF attack")
		return
	}

	tokenMaker, _ := authZ.NewPasetoMaker()
	_, err := tokenMaker.VerifyToken(state)
	if err != nil {
		plogger.Error("Token Verification Failed! Cannot validate oauth callback state ! Cannot check for CSRF attack!", err)
		ctx.AbortWithStatusJSON(http.StatusForbidden, apierror.Forbidden)
		return
	}

	code, ok := ctx.GetQuery(CODE)
	if !ok {
		plogger.Info(code)
		plogger.Error(ok)
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Auth Code Param is not valid!"})
		return
	}

	//TODO : Make secret storage more secure using hashing, HMAC, or some other algo

	redirectURI := env.ApiURL + "/api/linkedin/oauth/access/callback"

// 	GET https://api.instagram.com/oauth/authorize
//   ?client_id={app-id},
//   &redirect_uri={redirect-uri},
//   &response_type=code,
//   &scope={scope}

	postData := url.Values{}
	postData.Set("grant_type", "authorization_code")
	postData.Set("code", code)
	postData.Set("client_id", clientId)
	postData.Set("client_secret", clientSecret)
	postData.Set("redirect_uri", redirectURI)

	//map go to json for body
	// body := strings.NewReader( json.Marshal(postData))
	// plogger.Info("access token request body", body)
	url := env.InstagramOAuthAuthorisationUrl + "?" + postData.Encode()
	plogger.Info("request url :", url)
	//
	//req, err := http.NewRequest("POST", url, nil)
	//if err != nil {
	//	ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error creating the oauth token request!"})
	//	return
	//}
	//
	//req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	//
	//// Send the HTTP request
	//resp, err := http.DefaultClient.Do(req)
	//if err != nil {
	//	plogger.Error("Error getting the oauth token!", err)
	//	ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error getting the oauth token!"})
	//	return
	//}
	//
	//defer resp.Body.Close()
	//
	//// Parse the JSON response to get the access token
	////{
	////	"access_token": "AQUySrIaIVunlUZuTWo86478yH79hLOmCDlnNvGch-nmBdt8X6dkJ58Sk4_CA4D-C9Tb5NaS-88FAHvHT9ov6dgGl4tho_hZ5-GqZ-G71Q3_PDO4bDaii44PjPbpP4F5cuuf5xkisN8FTiaxmgWiOEv8fx_6a-X7AtjVt14bHBMc5Z4Zqk-JyKK0MBoRLLzRb2n0VAusyB0NNwDdLXgud9dYmvKgRqZul3pufwN0_pPxjHlPtJRS9H89-9mExTdi2tBUGTWadTk1ULlloSa6T6JaVCVfSMpeF6umvjGN1FEmzvERP3uZJukmhZEqTv8h6-nioyyLMy0PD1irtetBMYHSLYETbQ",
	////		"expires_in": 5183999,
	////		"scope": "r_liteprofile,w_member_social"
	////}
	//
	//var tokenResp struct {
	//	AccessToken string `json:"access_token"`
	//	ExpiresIn   int64  `json:"expires_in"`
	//	Scope       string `json:"scope"`
	//}
	//
	//err = json.NewDecoder(resp.Body).Decode(&tokenResp)
	//if err != nil {
	//	plogger.Error("Failed JSON decoding of response")
	//	ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error getting the oauth token!"})
	//	return
	//}
	//
	//// store token in database or redis
	//// encrypt linkedin access token
	////encryptedToken, err := bcrypt.GenerateFromPassword([]byte(tokenResp.AccessToken), 15)
	//
	//args := models.SaveLinkedinAccessTokenParams{
	//	OrganisationGroupID: "org_yogveda",
	//	UserEmail:           jwtInfo.Username,
	//	AccessToken:         tokenResp.AccessToken,
	//	TokenScope:          tokenResp.Scope,
	//	ExpiresAt:           time.Now().Add(time.Duration(tokenResp.ExpiresIn) * time.Millisecond),
	//}
	//
	//plogger.Debug("Linkedin AccessToken Encrypted", args.AccessToken)
	//row, err := store.GetInstance().SaveLinkedinAccessToken(ctx, args)
	//if err != nil {
	//	plogger.Error("Failed Saving the access token!", err)
	//	ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
	//	return
	//}
	//plogger.Debug(row.UserEmail, " ", row.TokenScope)
	ctx.Redirect(http.StatusTemporaryRedirect, env.WebsiteURL + "/app/instagram")
	//ctx.JSON(http.StatusOK, gin.H{"email": row.UserEmail, "scope": row.Scope})
}
