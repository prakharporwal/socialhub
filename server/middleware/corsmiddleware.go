package middleware

import (
	"github.com/gin-gonic/gin"
	"strings"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", getAccessAllowedControlHeaders())
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
	}
}

func getAccessAllowedControlHeaders() string {
	accessControlAllowedHeadersList := []string{
		"Content-Type",
		"Content-Length",
		"Accept-Encoding",
		"X-CSRF-Token",
		"Authorization",
		"accept",
		"origin",
		"Cache-Control",
		//"access_token",
		"X-Requested-With",
	}

	return strings.Join(accessControlAllowedHeadersList, ", ")
}
