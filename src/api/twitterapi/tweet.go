package twitterapi

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"
	"strings"
)

const twitterFetchTweetsUrl = "https://api.twitter.com/2/tweets"

func FetchTweets(ctx *gin.Context) {

	args := sqlcmodels.TwitterAccountAccessTokens_findAccessTokenParams{
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		UserEmail:           auth.GetCurrentUser(),
	}

	row, err := store.GetInstance().TwitterAccountAccessTokens_findAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error getting bearer token from db! ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	req, err := http.NewRequest("GET", twitterFetchTweetsUrl, nil)
	if err != nil {
		plogger.Error("Error creating request to fetch tweets from twitter! ", err)
	}

	req.Header.Add("Authorization", "Bearer "+row.AccessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error(err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	defer resp.Body.Close()

	var respBody interface{}

	err = json.NewDecoder(resp.Body).Decode(&respBody)

	plogger.Info("Fetched Tweets From Twitter")
	ctx.JSON(http.StatusOK, gin.H{"tweets": respBody})
}

type tweetRequest struct {
	Text string `json:"text" binding:"required"`
}

const twitterPostTweetUrl = "https://api.twitter.com/2/tweets"

func WriteTweet(ctx *gin.Context) {
	plogger.Debug("-------------- WriteTweet -----------------")

	var reqBody tweetRequest

	err := ctx.ShouldBindJSON(&reqBody)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	// get access token to make api call
	args := sqlcmodels.TwitterAccountAccessTokens_findAccessTokenParams{
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		UserEmail:           auth.GetCurrentUser(),
	}

	row, err := store.GetInstance().TwitterAccountAccessTokens_findAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error getting bearer token from db! ", err)
		plogger.Debug("useremail: ", args.UserEmail, "organisationGroupId: ", args.OrganisationGroupID)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	tweetObj := map[string]interface{}{
		"text": reqBody.Text,
	}

	req, _ := http.NewRequest("POST", twitterPostTweetUrl, strings.NewReader(utils.Stringify(tweetObj)))
	req.Header.Add("Authorization", "Bearer "+row.AccessToken)

	http.DefaultClient.Do(req)

	ctx.JSON(http.StatusOK, gin.H{"message": "posted successfully"})
}
