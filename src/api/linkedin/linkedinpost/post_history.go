package linkedinpost

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/api/auth"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

func PostHistoryList(ctx *gin.Context) {
	out, _ := store.GetInstance().FetchAllPosts(ctx, auth.GetCurrentUser())

	plogger.Debug(out)

}
