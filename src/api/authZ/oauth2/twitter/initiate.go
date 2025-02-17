package twitter

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/env"
	"socialhub-server/pkg/utils"
)

func OAuth2Initiate(ctx *gin.Context) {
	responseType := "code"
	clientId := env.TwitterAppClientId

	state := utils.GenerateRandomString(30)
	// todo: to be generate in a safer way code challenge
	codeChallenge := "challenge"
	codeChallengeMethod := "plain"

	requestedScope := "tweet.read tweet.write users.read offline.access"
	dataParams := url.Values{}

	dataParams.Add("response_type", responseType)
	dataParams.Add("client_id", clientId)
	dataParams.Add("redirect_uri", env.TwitterOAuth2Callback)
	dataParams.Add("scope", requestedScope)
	dataParams.Add("state", state)
	dataParams.Add("code_challenge", codeChallenge)
	dataParams.Add("code_challenge_method", codeChallengeMethod)

	redirectURL := env.TwitterOAuth2AuthorizeUrl + "?" + dataParams.Encode()

	// ctx.Redirect(http.StatusFound, redirectURL)

	ctx.JSON(http.StatusOK, gin.H{"redirect_url": redirectURL})
}
