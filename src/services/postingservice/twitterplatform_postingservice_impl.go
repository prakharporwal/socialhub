package postingservice

import (
	"encoding/json"
	"net/http"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"
	"strings"
)

type TwitterPlatformPostingService struct {
	AccessToken string
}
type responseData struct {
	EditHistoryTweetIds []string `json:"edit_history_tweet_ids"`
	Id                  string   `json:"id"`
	Text                string   `json:"text"`
}
type tweetResponse struct {
	Data responseData `json:"data"`
}

// REFER: https://developer.x.com/en/docs/authentication/oauth-2-0/user-access-token
const twitterPostTweetUrl = "https://api.twitter.com/2/tweets"

func (ps *TwitterPlatformPostingService) CreatePost(postContent ContentModel) (string, error) {
	plogger.Debug("-------------- CreatePost Twitter-----------------")
	plogger.Debug("postContent: ", postContent)
	_, ok := postContent.(TextContentModel)
	if !ok {
		plogger.Error("Invalid post content type")
	}
	tweetObj := map[string]interface{}{
		"text": postContent.(TextContentModel).Text,
	}

	req, _ := http.NewRequest("POST", twitterPostTweetUrl, strings.NewReader(utils.Stringify(tweetObj)))
	req.Header.Add("Authorization", "Bearer "+ps.AccessToken)
	req.Header.Set("Content-Type", "application/json")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("failed making api call to twitter! ", err)
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		plogger.Error("Failed with error! Status code :", resp.StatusCode)
		return "", err
	}

	var respBody tweetResponse
	_ = json.NewDecoder(resp.Body).Decode(&respBody)

	plogger.Debug("posted successfully", respBody.Data.Id)
	return respBody.Data.Id, nil
}

func (ps *TwitterPlatformPostingService) UpdatePost(postId string, postContent ContentModel) error {
	return nil
}

func (ps *TwitterPlatformPostingService) DeletePost(postId string) error {
	return nil
}
