package server

import (
	"net/http"
	"socialhub-server/api"
	"socialhub-server/api/accounts"
	"socialhub-server/api/authN/sso/google/googleoauth2"
	"socialhub-server/api/authZ"
	"socialhub-server/api/authZ/oauth2/instagram"
	"socialhub-server/api/landingpage"
	"socialhub-server/api/posts"
	"socialhub-server/api/sduiv1"
	"socialhub-server/pkg/plogger"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/requestid"
	"github.com/gin-gonic/gin"

	"socialhub-server/api/authZ/oauth2/linkedin"
	"socialhub-server/api/authZ/oauth2/twitter"
	"socialhub-server/api/authZ/oauth2/youtube"
	"socialhub-server/api/authZ/password"
	"socialhub-server/api/linkedin/linkedinpost"
	"socialhub-server/api/twitterapi"
	"socialhub-server/server/middleware"
)

// InitRouter initializes and returns a new Gin engine configured with middleware, error handlers, and routing groups for the web API. It sets up default handlers for unsupported HTTP methods and undefined routes—including CORS support for preflight OPTIONS requests—and organizes endpoints into a public group (/api) serving health checks, authentication, OAuth callbacks, early access signups, and static file serving, as well as a protected group (/p) secured with authentication that provides social media integrations, account information retrieval, tweet management, LinkedIn post management, and posts CRUD operations.
func InitRouter() *gin.Engine {
	router := gin.New()
	router.Use(requestid.New())

	router.NoMethod(func(context *gin.Context) {
		context.JSON(http.StatusNotFound, gin.H{"message": "no such method found"})
	})

	router.NoRoute(func(ctx *gin.Context) {
		ctx.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		ctx.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		ctx.Writer.Header().Set("Access-Control-Allow-Headers", middleware.GetAccessAllowedControlHeaders())
		ctx.Writer.Header().Set("Access-Control-Max-Age", "86400") // one day

		// to avoid preflight not found => resulting in cors error
		if ctx.Request.Method == http.MethodOptions {
			ctx.AbortWithStatus(http.StatusOK)
			return
		}
		plogger.Debug("Trying to access", ctx.Request.Method, ctx.Request.URL)
		ctx.JSON(http.StatusNotFound, gin.H{"message": "no such route found"})
	})

	//r.GET("/persist", linkedin.Persist)

	public := router.Group("/api")
	public.Use(cors.Default()) // as this is public we don't need access_token header
	public.GET("/health", api.HealthCheck)
	public.POST("/early-access/signup", landingpage.SubmitForEarlyAccess)

	public.POST("/v1/page/fetch", sduiv1.PageFetchV4)

	public.POST("/v1/login", authZ.Login)
	public.POST("/v1/signup", authZ.SignUp)
	public.POST("/v1/password/change", password.ChangePassword)
	public.POST("/v1/password/forgot/request", password.ForgotPasswordRequest)
	public.POST("/v1/password/forgot/reset", password.ForgotPasswordReset)
	public.GET("/v1/google/oauth2/signup/callback/:hashParam", googleoauth2.SignUpCallback)
	public.GET("/v1/google/oauth2/signup", googleoauth2.InitiateSignup)
	public.POST("/v1/google/oauth2/signup", googleoauth2.FetchUserEmailFromGoogle)

	// directory path relative to project root not this file location
	public.StaticFS("/static", http.Dir("templates/static"))

	protected := public.Group("/p")
	protected.Use(middleware.CORSMiddleware())
	protected.Use(middleware.AuthMiddleware())

	protected.GET("/instagram/oauth2/access/initiate", instagram.OAuth2Initiate)
	public.GET("/instagram/oauth2/access/callback", instagram.OAuth2Callback)

	protected.GET("/youtube/oauth2/access/initiate", youtube.OAuth2Initiate)
	public.GET("/youtube/oauth2/access/callback", youtube.OAuth2Callback)

	protected.GET("/linkedin/oauth/access/initiate", linkedin.FetchAuthCode)

	public.GET("/linkedin/oauth/access/callback", linkedin.GetAccessToken)
	//protected.GET("/twitter/oauth/access/initiate", twitter.AccessTokenAPI)
	protected.GET("/twitter/oauth2/access/initiate", twitter.OAuth2Initiate)
	//protected.GET("/twitter/oauth/access", twitter.RequestAccess)
	public.GET("/twitter/oauth2/access/callback", twitter.OAuthCallbackController)
	protected.GET("/twitter/tweets/all", twitterapi.FetchTweets)
	protected.POST("/twitter/tweets/create", twitterapi.WriteTweet)

	protected.POST("/linkedin/post", linkedinpost.CreatePostForFeed)
	protected.POST("/linkedin/schedule/post", linkedinpost.SchedulePost)
	protected.GET("/linkedin/posts/fetchall", linkedinpost.PostsHistoryList)

	protected.GET("/linkedin/account/info", accounts.LinkedinConnectedAccountInfo)
	protected.GET("/twitter/account/info", accounts.TwitterConnectedAccountInfo)

	// posts crud operations
	protected.POST("/posts", posts.CreatePost)
	protected.PUT("/posts", posts.UpdatePost)

	return router
}
