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

func GetPost(ctx *gin.Context) {
	plogger.Info("---------GetPost-------------")
	postIdString := ctx.Param("post_id")
	postId, ok := parsePostId(postIdString)
	if !ok {
		plogger.Error("GetPost - postId is not valid", postId)
		ctx.JSON(http.StatusForbidden, apierror.Forbidden)
		return
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

func GetPostsPaginated(ctx *gin.Context) {
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
