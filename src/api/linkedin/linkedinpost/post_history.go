package linkedinpost

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
)

func PostsHistoryList(ctx *gin.Context) {
	args := sqlcmodels.LinkedinScheduledUserPosts_fetchAllPostsParams{
		CreatedBy: auth.GetCurrentOrganisationId() + " | " + auth.GetCurrentUser(),
		Limit:     100,
	}
	out, _ := store.GetInstance().LinkedinScheduledUserPosts_fetchAllPosts(ctx, args)

	ctx.JSON(http.StatusOK, out)
}
