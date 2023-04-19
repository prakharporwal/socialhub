package linkedinpost

import (
	"context"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/model/cache"
	"socialhub-server/pkg/plogger"
	"time"
)

func PostToFeed(ctx *gin.Context) {
	// get current user id and get current user password
	plogger.Info(cache.Conn().Set(context.Background(), "user-num", "ahsdbhsdhsd", time.Duration(100000)*time.Millisecond))

	ctx.JSON(http.StatusOK, gin.H{"message": cache.Conn().Get(context.Background(), "user-num").Val()})
}
