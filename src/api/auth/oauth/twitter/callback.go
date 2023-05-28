package twitter

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/api/auth"
	models "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

const twitterAccessTokenUrl = "https://api.twitter.com/2/oauth2/token"

func OAuthCallbackController(ctx *gin.Context) {
	twitterOAuthToken := ctx.Query("code")
	oauthVerifier := ctx.Query("state")

	plogger.Debug(twitterOAuthToken)
	plogger.Debug(oauthVerifier)

	// 1. verify the state variable

	// 2. store token in db

	queryData := url.Values{}
	queryData.Add("content-type", "application/x-www-form-urlencoded")
	queryData.Add("code", twitterOAuthToken)
	queryData.Add("grant_type", "authorization_code")
	queryData.Add("client_id", "rG9n6402A3dbUJKzXTNX4oWHJ")
	queryData.Add("redirect_uri", twitterOAuthCallback)
	queryData.Add("code_verifier", "challenge")

	reqUrl := twitterAccessTokenUrl + "?" + queryData.Encode()

	req, err := http.NewRequest("POST", reqUrl, nil)

	resp, err := http.DefaultClient.Do(req)

	if err != nil {
		plogger.Info("error getting tweets from twitter ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}
	plogger.Debug(resp.StatusCode)
	plogger.Debug(resp.Status)
	plogger.Debug(resp.Header)

	defer resp.Body.Close()

	var respBody struct {
		AccessToken string `json:"token"`
		Scope       string `json:"scope"`
	}

	err = json.NewDecoder(resp.Body).Decode(&respBody)
	if err != nil {
		plogger.Error("Failed JSON decoding of response")
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
		return
	}

	args := models.SaveTwitterAccessTokenParams{
		AccessToken:         respBody.AccessToken,
		UserEmail:           auth.GetCurrentUser(),
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		Scope:               respBody.Scope,
		ExpiresAt:           time.Now().Add(100 * time.Hour),
	}

	row, err := store.GetInstance().SaveTwitterAccessToken(ctx, args)

	plogger.Info(row.UserEmail)
	plogger.Info(row.Scope)

	ctx.JSON(http.StatusOK, gin.H{"message": "success", "token": twitterOAuthToken})
}
