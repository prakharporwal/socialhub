package server

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/pkg/plogger"
	"strconv"
)

type Server struct {
	Router     *gin.Engine `json:"router"`
	ServerPort int         `json:"server_port"`
}

func NewServer(serverPort int) *Server {
	return &Server{
		Router:     InitRouter(),
		ServerPort: serverPort,
	}
}

func (srv *Server) Start() {
	err := srv.Router.Run(":" + strconv.Itoa(srv.ServerPort))
	if err != nil {
		plogger.Error("Something Went Wrong! Server could not start!")
		panic(err)
	}
}

func (srv *Server) Stop() {
}
