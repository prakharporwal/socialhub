package linkedinpost

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	"socialhub-server/model/store"
)

func PostsHistoryList(ctx *gin.Context) {
	out, _ := store.GetInstance().FetchAllPosts(ctx, auth.GetCurrentOrganisationId()+" | "+auth.GetCurrentUser())

	ctx.JSON(http.StatusOK, out)
}
