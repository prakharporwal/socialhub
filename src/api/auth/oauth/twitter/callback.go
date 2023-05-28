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
	clientId := "T0d6MDNldDZNR19yU29xbFBTb3k6MTpjaQ"
	clientSecret := "2Qf7eGgae5W0J95J6eVoAm2lOfM58pXh1-Kzqy5yESc_f83dGO"

	plogger.Debug(twitterOAuthToken)
	plogger.Debug(oauthVerifier)

	// 1. verify the state variable

	// 2. store token in db

	queryData := url.Values{}
	queryData.Add("code", twitterOAuthToken)
	queryData.Add("grant_type", "authorization_code")
	queryData.Add("client_id", clientId)
	queryData.Add("redirect_uri", twitterOAuthCallback)
	// todo: use a complex code_verifier
	queryData.Add("code_verifier", "challenge")

	reqUrl := twitterAccessTokenUrl + "?" + queryData.Encode()

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

	plogger.Info(" Getting Access Token API call failed! ")
	plogger.Debug(resp.StatusCode)
	plogger.Debug(resp.Status)
	plogger.Debug(resp.Header)

	if resp.StatusCode != http.StatusOK {
		plogger.Error(" Getting Access Token API call failed ! ")
		plogger.Debug(resp.StatusCode)
		plogger.Debug(resp.Status)
		plogger.Debug(resp.Header)
	}

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

	plogger.Debug(respBody)

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
