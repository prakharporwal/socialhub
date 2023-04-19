package server

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/api/oauth/linkedin"
)

func InitRouter() *gin.Engine {
	r := gin.Default()

	//r.GET("/persist", linkedin.Persist)
	r.GET("/oauth/initiate", linkedin.FetchAuthCode)
	r.GET("/oauth/callback", linkedin.GetAuthenticateToken)

	return r
}
