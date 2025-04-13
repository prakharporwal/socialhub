package posts

import (
	"database/sql"
	"net/http"
	"socialhub-server/api/authZ"
	"socialhub-server/model/datamodels/postcreation/postcreationstatus"
	"socialhub-server/model/datamodels/postcreation/postingstatus"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"

	"github.com/gin-gonic/gin"
)

// CreatePost handles the creation of a new post
// @Summary Create a new post
func CreatePost(ctx *gin.Context) {
	plogger.Info("----------CreatePost called----------")
	// Extract the request body
	var requestBody struct {
		PostType       string   `json:"post_type" binding:"required"`
		CreationStatus string   `json:"creation_status" binding:"required"`
		PostText       string   `json:"post_text" binding:"required"`
		Platforms      []string `json:"platforms" binding:"required"`
		PostImgURL     string   `json:"post_img_url,omitempty"`
		PostVideoURL   string   `json:"post_video_url,omitempty"`
	}

	if err := ctx.ShouldBindJSON(&requestBody); err != nil {
		plogger.Error("Failed to bind request body JSON", err)
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	// Here you would typically save the post to a database
	// For demonstration, we'll just return the created post
	queryArgs := db.PostInfo_createPostParams{
		PostType:            requestBody.PostType,
		CreationStatus:      requestBody.CreationStatus,
		PostUrl:             "", // empty
		Platforms:           requestBody.Platforms,
		PostImgUrl:          sql.NullString{String: requestBody.PostImgURL, Valid: requestBody.PostImgURL != ""},
		PostVideoUrl:        sql.NullString{String: requestBody.PostVideoURL, Valid: requestBody.PostVideoURL != ""},
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		PostText:            requestBody.PostText,
		UserEmail:           authZ.GetCurrentUser(),
	}

	row, err := store.GetInstance().PostInfo_createPost(ctx, queryArgs)
	if err != nil {
		plogger.Error("Failed to create post", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	// start posting to all the platforms
	// push to some posting queue
	// chill the status should be updated in the table
	// push to scheduled jobs table

	// Drafts are not added to the queue
	if requestBody.CreationStatus == postcreationstatus.PostCreationStatusCompleted {
		for _, platform := range requestBody.Platforms {
			// create n separate entries in the schedule table with status PENDING, SCHEDULED
			// this will be picked by the posting job in 1 minute
			// there can be multiple reason for failure of the posting in this synchronous call
			// hence separating out that logic ( like user token expiry, internet issue, downtime of the
			// posting platform)
			args := db.PostingHistory_addPostParams{
				PostID:          row.PostID,
				PostingStatus:   postingstatus.PostingStatusPending,
				SocialAccountID: platform + ":",
				Platform:        platform,
				CreatedBy:       authZ.GetCurrentUser(),
				ScheduledTime:   time.Now(),
			}
			plogger.Info("----------CreatePost created----------", queryArgs)
			_, err := store.GetInstance().PostingHistory_addPost(ctx, args)
			if err != nil {
				plogger.Error("Failed to add post to posting history table", err)
			}
		}
	}

	ctx.JSON(201, gin.H{
		"message":   "Post received successfully!",
		"platforms": requestBody.Platforms,
		"post":      row,
	})
}
