package main

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/pkg/plogger"
	"socialhub-server/server"
)

func init() {
	gin.SetMode(gin.DebugMode)
	plogger.Info("Starting app ....")
}

func main() {
	srv := server.NewServer()

	srv.Start()
	plogger.Info("Server started on 8080")
}
