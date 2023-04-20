package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
)

const symmetricKey = "TjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8"

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// implement auth check from token
		accessToken := ctx.GetHeader("access_token")
		if accessToken == "" {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": "Need access-token Header"})
			return
		}

		authorization := ctx.GetHeader("Authorization")
		if authorization == "" {
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": "Need Authorization Header"})
			return
		}

		tokenMaker, err := auth.NewPasetoMaker()
		if err != nil {
			plogger.Error("Token Creation Failed ! ", err)
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, apierror.UnexpectedError)
			return
		}

		payload, err := tokenMaker.VerifyToken(accessToken)
		if err != nil {
			plogger.Error("Token Verification Failed! ", err)
			ctx.AbortWithStatusJSON(http.StatusForbidden, apierror.Forbidden)
			return
		}

		plogger.Info("current user ", payload.Username)
		auth.SetCurrentUser(payload.Username)
		ctx.Set("current_user", auth.GetCurrentUser())

		ctx.Next()
	}
}
