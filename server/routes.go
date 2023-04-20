package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api"
	"socialhub-server/api/auth"
	"socialhub-server/api/auth/oauth/linkedin"
	"socialhub-server/api/linkedin/linkedinpost"
	"socialhub-server/server/middleware"
)

func InitRouter() *gin.Engine {
	router := gin.New()

	router.NoMethod(func(context *gin.Context) {
		context.JSON(http.StatusNotFound, gin.H{"message": "no such method found"})
	})

	router.NoRoute(func(context *gin.Context) {
		context.JSON(http.StatusNotFound, gin.H{"message": "no such route found"})
	})

	//r.GET("/persist", linkedin.Persist)

	public := router.Group("")
	public.Use(cors.Default()) // as this is public we don't need access_token header
	public.GET("/health", api.HealthCheck)

	public.POST("/v1/login", auth.Login)
	public.POST("/v1/signup", auth.SignUp)

	auth := router.Group("/app")
	auth.Use(middleware.CORSMiddleware())
	//auth.Use(middleware.AuthMiddleware())

	auth.GET("/linkedin/oauth/access/initiate", linkedin.FetchAuthCode)
	auth.GET("/linkedin/oauth/access/callback", linkedin.GetAccessToken)
	auth.GET("/linkedin/post", linkedinpost.CreatePostForFeed)

	return router
}
