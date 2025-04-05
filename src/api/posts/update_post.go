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

// Extract the request body

const CreationStatusDraft = "DRAFT"
const CreationStatusReady = "READY"

func UpdatePost(ctx *gin.Context) {
	var reqBody struct {
		PostType     string `json:"post_type" binding:"required"`
		PostText     string `json:"post_text" binding:"required"`
		PostImgURL   string `json:"post_img_url"`
		PostVideoURL string `json:"post_video_url"`
		IsDraft      bool   `json:"is_draft,omitempty"`
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
	creationStatus := CreationStatusReady
	if reqBody.IsDraft {
		creationStatus = CreationStatusDraft
	}

	queryArgs := db.PostInfo_updatePostParams{
		PostID:         postId,
		CreationStatus: creationStatus,
		PostType:       reqBody.PostType,
		PostText:       reqBody.PostText,
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
