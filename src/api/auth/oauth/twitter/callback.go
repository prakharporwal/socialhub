package twitter

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	models "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"time"
)

const twitterAccessTokenUrl = "https://api.twitter.com/oauth2/token"

func OAuthCallbackController(ctx *gin.Context) {
	twitterOAuthToken := ctx.Query("code")
	oauthVerifier := ctx.Query("state")

	plogger.Debug(twitterOAuthToken)
	plogger.Debug(oauthVerifier)

	// 1. verify the state variable

	// 2. store token in db
	req, err := http.NewRequest("POST", twitterAccessTokenUrl, nil)

	resp, err := http.DefaultClient.Do(req)
	defer resp.Body.Close()

	var respBody struct {
		AccessToken string `json:"access_token"`
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
