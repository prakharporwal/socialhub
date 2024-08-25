package crons

import (
	"context"
	"encoding/json"
	"github.com/robfig/cron/v3"
	"net/http"
	"socialhub-server/api/authZ"
	"socialhub-server/api/linkedin/linkedinpost"
	"socialhub-server/model/models"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"
	"socialhub-server/services/linkedinservice"
	"strings"
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
const twitterPostTweetUrl = "https://api.twitter.com/2/tweets"

func pickScheduledPosts() {
	rows, err := store.GetInstance().FetchPostsToBePublished(context.Background(), PostCountInSingleRun)
	if err != nil {
		plogger.Error(err)
	}

	if len(rows) == 0 {
		//plogger.Debug("No Posts Scheduled!")
	}

	// post on linkedin
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

		postId, err := linkedinservice.SendPostToLinkedin(row.PostJsonString, linkedinAccessToken)
		if err != nil {
			plogger.Error("failed while sending posting to linkedin -", err)
		}

		// todo: update your db with postId after posting to twitter and linkedin
		plogger.Debug("postId: ", postId)

		args := sqlcmodels.UpdatePostStatusParams{
			ScheduledPostID: row.ScheduledPostID,
			Status:          PUBLISHED,
		}
		updatedRow, err := store.GetInstance().UpdatePostStatus(context.Background(), args)
		if err != nil {
			plogger.Error("Failed to update post status ", err)
		}
		plogger.Debug(updatedRow.ScheduledPostID, " ", updatedRow.Status)

		//post on twitter
		// get access token to make api call
		twitterTokenArgs := sqlcmodels.TwitterAccountAccessTokens_findAccessTokenParams{
			OrganisationGroupID: authZ.GetCurrentOrganisationId(),
			UserEmail:           authZ.GetCurrentUser(),
		}

		row, err := store.GetInstance().TwitterAccountAccessTokens_findAccessToken(context.Background(), twitterTokenArgs)
		if err != nil {
			plogger.Error("Error getting bearer token from db! ", err)
			return
		}

		tweetObj := map[string]interface{}{
			"text": post.Commentary,
		}

		req, _ := http.NewRequest("POST", twitterPostTweetUrl, strings.NewReader(utils.Stringify(tweetObj)))
		req.Header.Add("Authorization", "Bearer "+row.AccessToken)
		req.Header.Add("Content-Type", "application/json")
		resp, err := http.DefaultClient.Do(req)
		if err != nil {
			plogger.Debug("Error sending HTTP request!")
		}
		var respBody interface{}
		_ = json.NewDecoder(resp.Body).Decode(&respBody)
		plogger.Debug("response body ", respBody)

		resp.Body.Close()
	}
}
