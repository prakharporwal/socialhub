package linkedinpost

import (
	"context"
	"encoding/json"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"socialhub-server/api/auth"
	"socialhub-server/model/models"
	"socialhub-server/model/models/linkedin"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/encrypt"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"
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
	if err != nil {
		plogger.Error("Invalid request body ", err)
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	// get current user id and get current user password
	token, err := FetchLinkedinAccountAccessToken()
	if err != nil {
		plogger.Error(err)
		ctx.Redirect(http.StatusTemporaryRedirect, "/app/linkedin/oauth/access/initiate")
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Linkedin Account not connected or access revoked"})
		return
	}

	//urn:li:person:123
	//urn:li:organization:456
	//urn:li:sponsoredAccount:789

	byteStr, _ := json.Marshal(reqBody.Data)

	args := sqlcmodels.ScheduleAUserPostOnLinkedinParams{
		ScheduledPostID: uuid.New().String(),
		PostJsonString:  string(byteStr),
		PostType:        reqBody.ContentType.String(),
		ScheduledTime:   time.Now(),
		Status:          "PUBLISHED",
		CreatedBy:       auth.GetCurrentUser(),
	}

	_, err = store.GetInstance().ScheduleAUserPostOnLinkedin(ctx, args)
	if err != nil {
		plogger.Error("error inserting ", err)
		return
	}

	out := ""
	switch reqBody.ContentType {
	case linkedin.TEXT:
		var content models.LinkedInFeedPostContent
		_ = utils.JsonToStruct(reqBody.Data, &content)
		content.Commentary = reqBody.Text
		out, err = serviceLinkedin.CreateALinkedinTextPost(token, &content)
		break
	case linkedin.POLL:
		var content models.LinkedInFeedPostContentPoll
		_ = utils.JsonToStruct(reqBody.Data, &content)
		content.Commentary = reqBody.Text
		out, err = serviceLinkedin.CreateALinkedinPoll(token, &content)
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

func FetchLinkedinAccountAccessToken() (string, error) {
	args := sqlcmodels.FindLinkedInAccountAccessTokenParams{
		OrganisationGroupID: "org_yogveda",
		UserEmail:           "prakharporwal99@gmail.com",
	}

	row, err := store.GetInstance().FindLinkedInAccountAccessToken(context.Background(), args)
	if err != nil {
		plogger.Error("Error getting access token for linkedin!", err)
		return ",", ErrNotFound
	}
	//
	//if row.ExpiresAt.Before(time.Now()) {
	//
	//	return "", ErrTokenExpired
	//}

	return encrypt.DecryptToken(row.AccessToken), nil
}
