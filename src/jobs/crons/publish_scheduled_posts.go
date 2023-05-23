package crons

import (
	"context"
	"encoding/json"
	"github.com/robfig/cron/v3"
	"socialhub-server/api/linkedin/linkedinpost"
	"socialhub-server/model/models"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"socialhub-server/services/linkedinservice"
)

type PostStatus string

const (
	SUBMITTED PostStatus = "SUBMITTED"
	FAILED               = "FAILED"
	SCHEDULED            = "SCHEDULED"
	PUBLISHED            = "PUBLISHED"
)

func PublishPostsToLinkedin() {
	plogger.Info("Reading from db cron job")

	c := cron.New()
	// cron job runs every 2 minutes
	entryId, err := c.AddFunc("@every 1m", pickScheduledPosts)
	if err != nil {
		plogger.Error("Scheduling Cron Job failed! ", err)
	}
	plogger.Info("Scheduled Cron Id: ", entryId)
	c.Start()
}

const PostCountInSingleRun = 100

func pickScheduledPosts() {
	rows, err := store.GetInstance().FetchPostsToBePublished(context.Background(), PostCountInSingleRun)
	if err != nil {
		plogger.Error(err)
	}

	if len(rows) == 0 {
		plogger.Debug("No Posts Scheduled!")
	}

	for i, row := range rows {
		if i >= 1 {
			continue
		}
		plogger.Info(row.ScheduledPostID, row.ScheduledTime, row.PostJsonString)

		var post models.LinkedInFeedPostContentPoll
		err = json.Unmarshal([]byte(row.PostJsonString), &post)
		if err != nil {
			plogger.Error("error unmarshalling json post string ", err)
		}

		plogger.Info("post commentary ", post.Commentary)

		linkedinAccessToken, err := linkedinpost.FetchLinkedinAccountAccessToken()
		if err != nil {
			plogger.Error(err)
			return
		}

		err = linkedinservice.SendPostToLinkedin(row.PostJsonString, linkedinAccessToken)
		if err != nil {
			plogger.Error("failed while sending posting to linkedin -", err)
		}
		args := db.UpdatePostStatusParams{
			ScheduledPostID: row.ScheduledPostID,
			Status:          PUBLISHED,
		}

		updatedRow, err := store.GetInstance().UpdatePostStatus(context.Background(), args)
		if err != nil {
			plogger.Error("Failed to update post status ", err)
		}
		plogger.Debug(updatedRow.ScheduledPostID, " ", updatedRow.Status)
	}
}
