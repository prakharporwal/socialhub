package posts

import (
	"database/sql"
	"net/http"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

// DeletePost handles the HTTP request to delete a post identified by the "post_id" URL parameter.
// It validates the post ID and confirms that the post is owned by the requesting user.
// If the ID is invalid or the post does not belong to the user, it responds with a 403 Forbidden status.
// On deletion failure (e.g., if the post is not found or another error occurs), it returns a 500 Internal Server Error.
// Otherwise, it returns a 200 OK status with a success message.
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
