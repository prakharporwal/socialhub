package crons

import (
	"context"
	"socialhub-server/model/datamodels/enums"
	"socialhub-server/model/datamodels/postcreation/postingstatus"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"socialhub-server/services/postingservice"

	"github.com/robfig/cron/v3"
)

func PublishPostsToAllPlatforms() {
	plogger.Info("Reading from db cron job")

	c := cron.New()
	// cron job runs every 2 minutes
	entryId, err := c.AddFunc("@every 30s", postToPlatforms)
	if err != nil {
		plogger.Error("Scheduling Cron Job failed! ", err)
	}
	plogger.Info("Scheduled Cron Id: ", entryId)
	c.Start()
}

func postToPlatforms() {
	plogger.Info("------CRON: Posting to all platforms-----")
	rows, err := store.GetInstance().PostingHistory_fetchPost(context.Background(), PostCountInSingleRun)
	if err != nil {
		plogger.Error("Error from PostingHistory_fetchPost query", err)
		return
	}

	if len(rows) == 0 {
		plogger.Info("No posts to publish")
		return
	}

	for _, row := range rows {
		postingstrategy := postingservice.SocialMediaPlatformStrategy{}
		service := postingstrategy.GetStrategy(enums.SocialMediaPlatforms(row.Platform))
		postIdOnSocialPlatform, err := service.CreatePost(postingservice.TextContentModel{Text: row.PostText})
		if err != nil {
			plogger.Error("Error CreatePost on", row.Platform, err)
			return
		}

		args := db.PostingHistory_updatePostingStatusParams{PostID: row.PostID, PlatformPostID: postIdOnSocialPlatform, PostingStatus: postingstatus.PostingStatusCompleted}
		err = store.GetInstance().PostingHistory_updatePostingStatus(context.Background(), args)
		if err != nil {
			plogger.Error("Error from PostingHistory_updatePostingStatus query", err)
			return
		}
	}
}
