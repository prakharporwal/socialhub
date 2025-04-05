package posts

import (
	"database/sql"
	"socialhub-server/api/authZ"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// postOwnedByUser checks whether the post identified by postId is owned by the current user.
// It retrieves the post creator's email from the data store and compares it with the current user's email.
// If an error occurs during retrieval or if the emails do not match, it logs the error and returns false.
func postOwnedByUser(ctx *gin.Context, postId uuid.UUID) bool {
	user_email, err := store.GetInstance().PostInfo_getPostCreator(ctx, postId)
	if err != nil {
		plogger.Error("UpdatePost - Error fetching post creator", err)
		if err == sql.ErrNoRows {
			// The Post Id should exist
			plogger.Error("UpdatePost - Post Id does not exist", err)
			return false
		}
		return false
	}

	// Post should be owned by the user to update
	currUser := authZ.GetCurrentUser()
	if user_email != currUser {
		plogger.Error("UpdatePost - Post ID is not owned by the user: current", currUser, "post owner", user_email)
		return false
	}
	return true
}

// ParsePostId converts a string representing a post ID to a uuid.UUID.
// It returns the parsed UUID and a boolean indicating whether the conversion was successful.
// If the conversion fails, the function returns uuid.Nil and false.
func parsePostId(postIDString string) (uuid.UUID, bool) {
	postId, err := uuid.FromBytes([]byte(postIDString))
	if err != nil {
		plogger.Error("Failed to parse PostId", postIDString)
		return uuid.Nil, false
	}
	return postId, true
}
