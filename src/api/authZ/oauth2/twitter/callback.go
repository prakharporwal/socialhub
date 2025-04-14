package twitter

import (
	"encoding/json"
	"net/http"
	"net/url"
	"socialhub-server/api/accounts"
	"socialhub-server/api/authZ"
	"socialhub-server/env"
	"socialhub-server/model/datamodels/enums"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"

	"github.com/gin-gonic/gin"
)

func OAuthCallbackController(ctx *gin.Context) {
	twitterOAuthToken := ctx.Query("code")
	oauthVerifier := ctx.Query("state")
	clientId := env.TwitterAppClientId
	clientSecret := env.TwitterAppClientSecret

	plogger.Debug(twitterOAuthToken)
	plogger.Debug(oauthVerifier)

	// todo: add a validation to check if same as
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
		plogger.Error("Failed JSON decoding of response ", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
		return
	}

	args := sqlcmodels.SocialMediaAccount_upsertAccessTokenParams{
		AccessToken:         respBody.AccessToken,
		RefreshToken:        respBody.RefreshToken,
		TokenScope:          respBody.Scope,
		TokenType:           respBody.TokenType,
		Platform:            string(enums.TWITTER),
		UserEmail:           authZ.GetCurrentUser(),
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		ExpiresAt:           time.Now().Add(respBody.ExpiresInMicroseconds * time.Second),
	}

	row, err := store.GetInstance().SocialMediaAccount_upsertAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error saving the token to database ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	// Fetch User details as we get the access_token and refresh token
	// and save the user details in the database
	twUsername, accID := accounts.FetchAccountInfoFromTwitter(respBody.AccessToken)
	args.PlatformUsername = twUsername
	args.SocialAccountID = accID
	row, err = store.GetInstance().SocialMediaAccount_upsertAccessToken(ctx, args)
	if err != nil {
		// log and fail silently
		plogger.Error("Error saving twUsername, accID to database ", err)
	}

	plogger.Info(row.UserEmail)
	plogger.Info("scope from db response ", row.TokenScope)

	ctx.Redirect(http.StatusFound, env.WebsiteURL+"/app/twitter")
}
