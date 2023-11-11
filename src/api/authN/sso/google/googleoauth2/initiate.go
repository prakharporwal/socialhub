package googleoauth2

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func InitiateSignup(ctx *gin.Context) {

	//req, err := http.NewRequest(http.MethodGet)
	ctx.JSON(http.StatusOK, "cool")
}
