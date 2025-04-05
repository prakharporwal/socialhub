package posts

import (
	"database/sql"
	"net/http"
	"socialhub-server/api/authZ"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

// CreatePost handles the creation of a new post
// CreatePost creates a new post from the JSON request payload.
// It binds the request body containing required details (post type, creation status, post URL, post text,
// image URL, and video URL) and validates that all fields are provided.
// If the JSON binding fails, it responds with a 400 Bad Request status.
// Upon successful binding, it assembles the post parameters (including organization and user information)
// and attempts to create the post in the database.
// If the creation fails, it logs the error and responds with a 500 Internal Server Error status;
// otherwise, it returns a 201 Created status along with the created post data.
func CreatePost(ctx *gin.Context) {
	// Extract the request body
	var requestBody struct {
		PostType       string `json:"post_type" binding:"required"`
		CreationStatus string `json:"creation_status" binding:"required"`
		PostURL        string `json:"post_url" binding:"required"`
		PostText       string `json:"post_text" binding:"required"`
		PostImgURL     string `json:"post_img_url" binding:"required"`
		PostVideoURL   string `json:"post_video_url" binding:"required"`
	}

	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	// Here you would typically save the post to a database
	// For demonstration, we'll just return the created post
	queryArgs := db.PostInfo_createPostParams{
		PostType:            requestBody.PostType,
		CreationStatus:      requestBody.CreationStatus,
		PostUrl:             requestBody.PostURL,
		PostImgUrl:          sql.NullString{String: requestBody.PostImgURL, Valid: requestBody.PostImgURL != ""},
		PostVideoUrl:        sql.NullString{String: requestBody.PostVideoURL, Valid: requestBody.PostVideoURL != ""},
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		IsDeleted:           false,
		UserEmail:           authZ.GetCurrentUser(),
	}

	row, err := store.GetInstance().PostInfo_createPost(ctx, queryArgs)
	if err != nil {
		plogger.Error("Failed to create post", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}

	ctx.JSON(201, gin.H{
		"message": "Post created successfully!",
		"post":    row,
	})
}
