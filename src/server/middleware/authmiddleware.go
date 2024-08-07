package middleware

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/authZ"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// implement auth check from token
		accessToken := ctx.Request.Header.Get("access-token")
		if accessToken == "" {
			plogger.Error("Access Token is empty! , access-token ", accessToken)
			ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{"message": "Need access-token Header"})
			return
		}

		tokenMaker, err := authZ.NewPasetoMaker()
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

		authZ.SetCurrentUser(payload.Username)
		authZ.SetCurrentOrganisationId(payload.OrganisationGroupID)
		ctx.Set("current_user", payload.Username)

		ctx.Next()
	}
}
