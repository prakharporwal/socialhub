package posts

import (
	"database/sql"
	"net/http"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

func DeletePost(ctx *gin.Context) {
	postIDString := ctx.Param("post_id")
	postId, ok := parsePostId(postIDString)
	if !ok {
		plogger.Error("UpdatePost - postId is not valid", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
		return
	}

	// Check if the post is owned by the user
	if !postOwnedByUser(ctx, postId) {
		plogger.Error("UpdatePost - postNotOwnedByUser", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
		return
	}

	// Soft Delete the post
	_, err := store.GetInstance().PostInfo_deletePost(ctx, postId)
	if err != nil {
		if err == sql.ErrNoRows {
			plogger.Error("Post not found", postId, err)
		}
		plogger.Error("Failed to delete post", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete post"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "Post deleted successfully!",
	})
}
