package linkedinpost

import (
	"context"
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/model/models"
	"socialhub-server/model/models/linkedin"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"socialhub-server/services/linkedinservice"
	"time"
)

var serviceLinkedin = linkedinservice.ServiceImpl{}

type linkedInFeedPostRequest struct {
	ContentType linkedin.LinkedinContentType `json:"content_type" binding:"required,oneof=text poll"`
	Text        string                       `json:"text"`
	Data        interface{}                  `json:"data" binding:"required"`
}

func CreatePostForFeed(ctx *gin.Context) {
	reqBody := linkedInFeedPostRequest{}
	err := ctx.ShouldBindJSON(&reqBody)

	// get current user id and get current user password
	token, err := fetchLinkedinAccountAccessToken(ctx)
	if err != nil {
		plogger.Error(err)
		ctx.Redirect(http.StatusTemporaryRedirect, "/app/oauth/linkedin/access/initiate")
		return
	}

	//urn:li:person:123
	//urn:li:organization:456
	//urn:li:sponsoredAccount:789

	out := ""
	switch reqBody.ContentType {
	case linkedin.TEXT:
		content := reqBody.Data.(models.LinkedInFeedPostContent)
		out, err = serviceLinkedin.CreateALinkedinTextPost(token, content)
		break
	case linkedin.POLL:
		content := reqBody.Data.(models.LinkedInFeedPostContentPoll)
		out, err = serviceLinkedin.CreateALinkedinPoll(token, content)
		break
	default:
		break
	}

	if err != nil {
		plogger.Error(err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "post sent to linkedin", "resp": out})
}

var ErrTokenExpired = errors.New("access token is expired, obtain a new one")
var ErrNotFound = errors.New("token not found!")

func fetchLinkedinAccountAccessToken(ctx context.Context) (string, error) {
	args := sqlcmodels.FindLinkedInAccountAccessTokenParams{
		OrganisationGroupID: "org_yogveda",
		UserEmail:           "prakharporwal99@gmail.com",
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
