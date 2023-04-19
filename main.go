package main

import (
	"socialhub-server/pkg/plogger"
	"socialhub-server/server"
)

func main() {
	srv := server.NewServer()

	srv.Start()
	plogger.Info("Server started on 8080")
}
