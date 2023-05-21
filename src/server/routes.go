package server

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"html/template"
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

		ctx.JSON(http.StatusNotFound, gin.H{"message": "no such route found"})
	})

	//r.GET("/persist", linkedin.Persist)

	public := router.Group("")
	public.Use(cors.Default()) // as this is public we don't need access_token header
	public.GET("/health", api.HealthCheck)

	public.POST("/v1/login", auth.Login)
	public.POST("/v1/signup", auth.SignUp)

	type Todo struct {
		Title string
		Done  bool
	}

	type TodoPageData struct {
		PageTitle string
		Todos     []Todo
	}

	public.GET("/login", func(context *gin.Context) {
		tmpl := template.Must(template.ParseFiles("templates/login.html"))

		data := TodoPageData{
			PageTitle: "My TODO list",
			Todos: []Todo{
				{Title: "Task 1", Done: false},
				{Title: "Task 2", Done: true},
				{Title: "Task 3", Done: true},
			},
		}

		tmpl.Execute(context.Writer, data)
	})

	// directory path relative to project root not this file location
	public.StaticFS("/static", http.Dir("templates/static"))

	auth := router.Group("/app")

	auth.Use(middleware.CORSMiddleware())
	auth.Use(middleware.AuthMiddleware())

	auth.GET("/linkedin/oauth/access/initiate", linkedin.FetchAuthCode)
	public.GET("/linkedin/oauth/access/callback", linkedin.GetAccessToken)
	auth.POST("/linkedin/post", linkedinpost.CreatePostForFeed)

	return router
}