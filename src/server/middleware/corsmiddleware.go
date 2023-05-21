package middleware

import (
	"github.com/gin-gonic/gin"
	"strings"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", GetAccessAllowedControlHeaders())
		ctx.Writer.Header().Set("Access-Control-Allow-Methods", "POST,OPTIONS,GET,HEAD,PUT,PATCH,DELETE")
		ctx.Writer.Header().Set("Access-Control-Max-Age", "86400") // one day

		if ctx.Request.Method == "OPTIONS" {
			ctx.AbortWithStatus(204)
			return
		}
		ctx.Next()
	}
}

func GetAccessAllowedControlHeaders() string {
	accessControlAllowedHeadersList := []string{
		"Content-Type",
		"Content-Length",
		"Accept-Encoding",
		"X-CSRF-Token",
		"Authorization",
		"accept",
		"Origin",
		"Cache-Control",
		"AccessToken",
		"X-Requested-With",
		"access-token",
		"access_token",
		"X-Real-IP",
		"Host",
		"X-Forwarded-For",
	}

	return strings.Join(accessControlAllowedHeadersList, ",")
}
