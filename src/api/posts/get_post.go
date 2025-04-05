package posts

import (
	"net/http"
	"socialhub-server/api/authZ"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"strconv"

	"github.com/gin-gonic/gin"
)

const PAGE_SIZE = 10

// GetPost retrieves a specific post using its "post_id" URL parameter.
//
// It extracts and validates the post identifier, then confirms the post is owned by the current user.
// If the identifier is invalid or ownership is not confirmed, the function responds with a 403 Forbidden status.
// On successful validation, it fetches the post from the datastore and returns its details in a JSON response (HTTP 200).
// If an error occurs during data retrieval, it responds with a 500 Internal Server Error.
func GetPost(ctx *gin.Context) {
	plogger.Info("---------GetPost-------------")
	postIdString := ctx.Param("post_id")
	postId, ok := parsePostId(postIdString)
	if !ok {
		plogger.Error("GetPost - postId is not valid", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
	}

	if !postOwnedByUser(ctx, postId) {
		plogger.Error("GetPost - postNotOwnedByUser", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
		return
	}

	post, err := store.GetInstance().PostInfo_getPost(ctx, postId)
	if err != nil {
		plogger.Error("Failed to fetch post", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get post"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"post": post,
	})
}

// GetPostsPaginated handles HTTP requests to fetch a paginated list of posts for the current user.
// It extracts the "page" query parameter, validates and converts it to an integer (defaulting to 1 if less than 1),
// computes the offset based on a constant page size, and retrieves the corresponding posts from the database.
// On error, it responds with an appropriate HTTP status and error message in JSON format.
func GetPostsPaginated(ctx *gin.Context) {
	plogger.Info("---------GetPostsPaginated-------------")

	// Extract the page number from the query parameters
	pageNumberString := ctx.Query("page")
	if pageNumberString == "" {
		plogger.Error("Page number is required")
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}
	// Convert the page number to an integer
	pageNum, err := strconv.Atoi(pageNumberString)
	if err != nil {
		plogger.Error("Invalid page number, failed to parse page", pageNumberString, err)
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	//if pageNum less than 1, set it to 1
	if pageNum < 1 {
		pageNum = 1
	}

	params := db.PostInfo_getPostsPaginatedParams{
		Limit:     PAGE_SIZE,
		Offset:    int32(PAGE_SIZE * (pageNum - 1)),
		UserEmail: authZ.GetCurrentUser(),
	}
	posts, err := store.GetInstance().PostInfo_getPostsPaginated(ctx, params)
	if err != nil {
		plogger.Error("Failed to fetch posts", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get posts"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"posts": posts,
	})
}
