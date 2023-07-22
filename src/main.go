package main

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/env"
	"socialhub-server/jobs/crons"
	"socialhub-server/pkg/plogger"
	"socialhub-server/server"
)

func init() {
	gin.SetMode(gin.ReleaseMode)
	plogger.Info("Starting app ....")

	plogger.Info("Setting Up Cron")
	crons.PublishPostsToLinkedin()
}

func main() {
	srv := server.NewServer(env.ServerPort)

	plogger.Warn("Starting server on port: ", env.ServerPort)
	// line block at start not execute after it until process killed
	srv.Start()
}
