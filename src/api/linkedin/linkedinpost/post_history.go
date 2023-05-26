package linkedinpost

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

func PostsHistoryList(ctx *gin.Context) {
	out, _ := store.GetInstance().FetchAllPosts(ctx, auth.GetCurrentUser())

	plogger.Debug(out)

	ctx.JSON(http.StatusOK, out)
}
