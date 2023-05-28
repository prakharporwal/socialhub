package twitterapi

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/auth"
	models "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

const twitterFetchTweetsUrl = "https://api.twitter.com/2/tweets"

func FetchTweets(ctx *gin.Context) {

	args := models.FindTwitterAccountAccessTokenParams{
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		UserEmail:           auth.GetCurrentUser(),
	}

	row, err := store.GetInstance().FindTwitterAccountAccessToken(ctx, args)

	req, err := http.NewRequest("GET", twitterFetchTweetsUrl, nil)
	if err != nil {

	}

	req.Header.Add("Authorization", "Bearer "+row.AccessToken)

	resp, err := http.DefaultClient.Do(req)

	defer resp.Body.Close()

	var respBody interface{}

	err = json.NewDecoder(resp.Body).Decode(&respBody)

	plogger.Info("Fetched Tweets From Twitter")
	ctx.JSON(http.StatusOK, gin.H{"tweets": respBody})
}
