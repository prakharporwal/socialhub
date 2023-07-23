package twitter

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/api/auth"
	"socialhub-server/env"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

func OAuthCallbackController(ctx *gin.Context) {
	twitterOAuthToken := ctx.Query("code")
	oauthVerifier := ctx.Query("state")
	clientId := env.TwitterAppClientId
	clientSecret := env.TwitterAppClientSecret

	plogger.Debug(twitterOAuthToken)
	plogger.Debug(oauthVerifier)

	// 1. verify the state variable
	// 2. store token in db

	queryData := url.Values{}
	queryData.Add("code", twitterOAuthToken)
	queryData.Add("grant_type", "authorization_code")
	queryData.Add("client_id", clientId)
	queryData.Add("redirect_uri", env.TwitterOAuth2Callback)
	// todo: use a complex code_verifier
	queryData.Add("code_verifier", "challenge")

	reqUrl := env.TwitterAccessTokenUrl + "?" + queryData.Encode()

	req, err := http.NewRequest("POST", reqUrl, nil)
	req.Header.Add("content-type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(clientId, clientSecret)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Info("error getting tweets from twitter ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		plogger.Error(" Getting Access Token API call failed ! ")
		plogger.Debug(resp.StatusCode)
		plogger.Debug(resp.Status)
		plogger.Debug(resp.Header)
	}

	var respBody struct {
		AccessToken           string        `json:"access_token"`
		RefreshToken          string        `json:"refresh_token"`
		Scope                 string        `json:"scope"`
		TokenType             string        `json:"token_type"`
		ExpiresInMicroseconds time.Duration `json:"expires_in"`
	}

	err = json.NewDecoder(resp.Body).Decode(&respBody)
	if err != nil {
		plogger.Info("error decoding resp body ", err)
	}

	if err != nil {
		plogger.Error("Failed JSON decoding of response")
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
		return
	}

	args := sqlcmodels.SaveTwitterAccessTokenParams{
		AccessToken:         respBody.AccessToken,
		UserEmail:           auth.GetCurrentUser(),
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		TokenScope:          respBody.Scope,
		ExpiresAt:           time.Now().Add(respBody.ExpiresInMicroseconds * time.Second),
	}

	row, err := store.GetInstance().SaveTwitterAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error saving the token to database ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}
	plogger.Info(row.UserEmail)
	plogger.Info("scope from db response ", row.TokenScope)

	ctx.Redirect(http.StatusFound, env.WebsiteURL+"?twitter=success")
}
