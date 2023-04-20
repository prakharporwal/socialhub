package linkedinpost

import (
	"context"
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	models "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"socialhub-server/services/linkedinservice"
	"time"
)

var serviceLinkedin = linkedinservice.ServiceImpl{}

func CreatePostForFeed(ctx *gin.Context) {
	// get current user id and get current user password
	token, err := fetchLinkedinAccountAccessToken(ctx)
	if err != nil {
		plogger.Error(err)
		ctx.Redirect(http.StatusTemporaryRedirect, "/app/oauth/linkedin/access/initiate")
		return
	}

	serviceLinkedin.FeedPost(token, "How are you guys doing?", linkedinservice.PUBLIC)

	ctx.JSON(http.StatusOK, gin.H{"message": "post sent to linkedin"})
}

var ErrTokenExpired = errors.New("access token is expired, obtain a new one")
var ErrNotFound = errors.New("token not found!")

func fetchLinkedinAccountAccessToken(ctx context.Context) (string, error) {
	args := models.FindLinkedInAccountAccessTokenParams{
		OrganisationGroupID: "org_yogveda",
		UserEmail:           auth.GetCurrentUser(),
	}

	row, err := store.GetInstance().FindLinkedInAccountAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error getting access token for linkedin!", err)
		return ",", ErrNotFound
	}

	if row.ExpiresAt.Before(time.Now()) {

		return "", ErrTokenExpired
	}

	return row.AccessToken, nil
}
