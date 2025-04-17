package main

import (
	"socialhub-server/env"
	"socialhub-server/jobs/crons"
	"socialhub-server/pkg/plogger"
	"socialhub-server/server"

	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.ReleaseMode)
	plogger.Info("Starting app ....")

	plogger.Info("Setting Up Cron")
	crons.PublishPostsToLinkedin()
	crons.PublishPostsToAllPlatforms()
	crons.RefreshJob()
}

func main() {
	srv := server.NewServer(env.ServerPort)

	plogger.Warn("Starting server on port: ", env.ServerPort)
	// line block at start not execute after it until process killed
	srv.Start()
}
