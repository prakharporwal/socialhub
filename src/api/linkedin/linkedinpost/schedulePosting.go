package linkedinpost

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"net/http"
	"socialhub-server/api/auth"
	"socialhub-server/model/models"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

type schedulePostRequest struct {
	PostType    string                         `json:"post_type" binding:"required"`
	PostJson    models.LinkedInFeedPostContent `json:"post_json" binding:"required"`
	ScheduledAt string                         `json:"scheduled_at" binding:"required"`
}

func SchedulePost(ctx *gin.Context) {
	//todo validation
	var reqBody schedulePostRequest
	err := ctx.ShouldBindJSON(&reqBody)

	//and data filling
	// todo: encrypt JSON data of post json string
	arg := db.FetchLinkedinURNbyAccountIdParams{
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		UserEmail:           auth.GetCurrentUser(),
	}

	linkedinUrn, err := store.GetInstance().FetchLinkedinURNbyAccountId(ctx, arg)
	if err != nil {
		plogger.Error("failed to get linkedin urn from db ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		//return
	}

	reqBody.PostJson.Author = linkedinUrn
	postJsonByteArr, err := json.Marshal(reqBody.PostJson)
	if err != nil {
		plogger.Info("failed to marshal json")
	}

	//  bcrypt: password length exceeds 72 bytes
	//encryptedPostJson, err := bcrypt.GenerateFromPassword(postJsonByteArr, 15)
	//if err != nil {
	//	plogger.Error("Failed to encrypt post JSON file! ", err)
	//}
	scheduleTime, err := time.Parse(time.RFC3339, reqBody.ScheduledAt)

	args := db.ScheduleAUserPostOnLinkedinParams{
		ScheduledPostID:  uuid.NewString(),
		AccountID:        0,
		AuthorUrn:        linkedinUrn,
		PostType:         reqBody.PostType,
		PostIDOnLinkedin: "lol",
		PostJsonString:   string(postJsonByteArr),
		Status:           "SUBMITTED",
		CreatedBy:        auth.GetCurrentOrganisationId() + " | " + auth.GetCurrentUser(),
		ScheduledTime:    scheduleTime,
	}

	out, err := store.GetInstance().ScheduleAUserPostOnLinkedin(ctx, args)
	if err != nil {
		plogger.Error("failed to add post for scheduling in database ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	plogger.Debug(out.ScheduledPostID)
	plogger.Debug(out.ScheduledTime)
	plogger.Debug(out.PostType)

	ctx.JSON(http.StatusOK, gin.H{
		"message":     "post scheduled",
		"schedule_at": out.ScheduledTime,
		"post_id":     out.ScheduledPostID,
	})
}
