package google

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/pkg/plogger"
)

func SignIn(ctx *gin.Context) {
	plogger.Info("Error logger!")
	ctx.JSON(http.StatusTemporaryRedirect, gin.H{"message": "google signin!"})
}
