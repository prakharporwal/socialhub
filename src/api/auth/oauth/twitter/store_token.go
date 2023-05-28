package twitter

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/env"
	"socialhub-server/pkg/utils"
)

const twitterOAuth2Url = "https://twitter.com/i/oauth2/authorize"

func OAuth2Initiate(ctx *gin.Context) {
	responseType := "code"
	clientId := "T0d6MDNldDZNR19yU29xbFBTb3k6MTpjaQ"

	state := utils.GenerateRandomString(30)
	// todo: to be generate in a safer way code challenge
	codeChallenge := "challenge"
	codeChallengeMethod := "plain"

	requestedScope := "tweet.read tweet.write users.read offline.access"
	dataParams := url.Values{}

	dataParams.Add("response_type", responseType)
	dataParams.Add("client_id", clientId)
	dataParams.Add("redirect_uri", env.TwitterOAuthCallback)
	dataParams.Add("scope", requestedScope)
	dataParams.Add("state", state)
	dataParams.Add("code_challenge", codeChallenge)
	dataParams.Add("code_challenge_method", codeChallengeMethod)

	redirectURL := twitterOAuth2Url + "?" + dataParams.Encode()

	// ctx.Redirect(http.StatusFound, redirectURL)

	ctx.JSON(http.StatusOK, gin.H{"redirect_url": redirectURL})
}
