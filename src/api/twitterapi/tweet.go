package twitterapi

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	models "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"
	"strings"
)

const twitterFetchTweetsUrl = "https://api.twitter.com/2/tweets"

func FetchTweets(ctx *gin.Context) {

	args := models.FindTwitterAccountAccessTokenParams{
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		UserEmail:           auth.GetCurrentUser(),
	}

	accessToken, err := store.GetInstance().FindTwitterAccountAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error getting bearer token from db! ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	req, err := http.NewRequest("GET", twitterFetchTweetsUrl, nil)
	if err != nil {
		plogger.Error("Error creating request to fetch tweets from twitter! ", err)
	}

	req.Header.Add("Authorization", "Bearer "+accessToken)

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
	var reqBody tweetRequest

	err := ctx.ShouldBindJSON(&reqBody)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	// get access token to make api call
	args := models.FindTwitterAccountAccessTokenParams{
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		UserEmail:           auth.GetCurrentUser(),
	}

	accessToken, err := store.GetInstance().FindTwitterAccountAccessToken(ctx, args)
	if err != nil {
		plogger.Error("Error getting bearer token from db! ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	tweetObj := map[string]interface{}{
		"text": reqBody.Text,
	}

	req, _ := http.NewRequest("POST", twitterPostTweetUrl, strings.NewReader(utils.Stringify(tweetObj)))

	req.Header.Add("Authorization", "Bearer "+accessToken)

	http.DefaultClient.Do(req)

	ctx.JSON(http.StatusOK, gin.H{"message": "posted successfully"})
}
