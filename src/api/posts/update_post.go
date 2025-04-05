package posts

import (
	"database/sql"
	"net/http"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

// UpdatePost handles an HTTP request to update a post in the social media application.
// It extracts a JSON payload with required fields ("post_type", "creation_status", "post_text", "post_img_url", and "post_video_url")
// and retrieves the post ID from the URL. The handler validates the JSON, checks that the post ID is valid,
// and ensures that the post is owned by the requesting user. On successful validation, it prepares the update parameters,
// including handling optional image and video URLs, and updates the post in the database.
// The handler returns a 200 OK response with the updated post data on success, or an appropriate error status otherwise.

func UpdatePost(ctx *gin.Context) {
	var reqBody struct {
		PostType       string `json:"post_type" binding:"required"`
		CreationStatus string `json:"creation_status" binding:"required"`
		PostText       string `json:"post_text" binding:"required"`
		PostImgURL     string `json:"post_img_url" binding:"required"`
		PostVideoURL   string `json:"post_video_url" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&reqBody); err != nil {
		plogger.Error("UpdatePost, Error Parsing! Invalid format", err)
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	postIDString := ctx.Param("post_id")
	postId, ok := parsePostId(postIDString)
	if !ok {
		plogger.Error("UpdatePost - postId is not valid", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
		return
	}

	if !postOwnedByUser(ctx, postId) {
		plogger.Error("UpdatePost - postNotOwnedByUser", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
		return
	}

	queryArgs := db.PostInfo_updatePostParams{
		PostID:         postId,
		CreationStatus: reqBody.CreationStatus,
		PostType:       reqBody.PostType,
		PostImgUrl:     sql.NullString{String: reqBody.PostImgURL, Valid: reqBody.PostImgURL != ""},
		PostVideoUrl:   sql.NullString{String: reqBody.PostVideoURL, Valid: reqBody.PostVideoURL != ""},
	}

	row, err := store.GetInstance().PostInfo_updatePost(ctx, queryArgs)
	if err != nil {
		plogger.Error("Failed to update post", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return
	}

	ctx.JSON(200, gin.H{
		"message": "Post updated successfully",
		"post":    row,
	})
}
