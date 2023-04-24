package server

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/pkg/plogger"
)

type Server struct {
	Router *gin.Engine `json:"router"`
}

func NewServer() *Server {
	return &Server{
		Router: InitRouter(),
	}
}

func (srv *Server) Start() {
	err := srv.Router.Run(":8080")
	if err != nil {
		plogger.Error("Something Went Wrong! Server could not start!")
		panic(err)
	}
}

func (srv *Server) Stop() {
}
