package twitter

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/pkg/plogger"
)

func OAuthCallbackController(ctx *gin.Context) {
	twitterOAuthToken := ctx.Param("oauth_token")
	oauthVerifier := ctx.Param("oauth_verifier")

	plogger.Debug(twitterOAuthToken)
	plogger.Debug(oauthVerifier)

	//ctx.Redirect(http.StatusFound, "https://www.yogveda.live;/")
	ctx.JSON(http.StatusOK, gin.H{"message": "success", "token": twitterOAuthToken})
}
