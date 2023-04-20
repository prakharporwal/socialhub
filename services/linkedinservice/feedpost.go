package linkedinservice

import (
	"encoding/json"
	"errors"
	"net/http"
	"socialhub-server/pkg/plogger"
	"strings"
)

type service interface {
	FeedPost()
}

type ServiceImpl struct {
}

type LinkedInFeedPostContentRequest struct {
	Author                    string              `json:"author"`
	Commentary                string              `json:"commentary"`
	Visibility                string              `json:"visibility"`
	Distribution              ContentDistribution `json:"distribution"`
	LifecycleState            string              `json:"lifecycleState"`
	IsReshareDisabledByAuthor bool                `json:"isReshareDisabledByAuthor"`
	Content                   PostContent         `json:"content"`
}

type ContentDistribution struct {
	FeedDistribution               string        `json:"feedDistribution"`
	TargetEntities                 []interface{} `json:"targetEntities"`
	ThirdPartyDistributionChannels []interface{} `json:"thirdPartyDistributionChannels"`
}

type PostContent struct {
	Poll PollInfo `json:"poll"`
}

type PollInfo struct {
	Question string        `json:"question"`
	Options  []PollOptions `json:"options"`
	Settings PollSettings  `json:"settings"`
}

type PollOptions struct {
	Text string `json:"text"`
}

type PollSettings struct {
	Duration string `json:"duration"`
}

type ContentVisibility string

const (
	PUBLIC  ContentVisibility = "PUBLIC"
	PRIVATE                   = "PRIVATE"
)

const postOnFeedURN = "https://api.linkedin.com/rest/posts"

func (ServiceImpl) FeedPost(accessToken string, text string, visibility ContentVisibility) (string, error) {
	urn := fetchLinkedinAccountURN(accessToken) // "urn:li:person:m55DJ0ZigA"

	requestBody := LinkedInFeedPostContentRequest{
		Author:     urn,
		Commentary: text,
		Visibility: string(visibility),
		Distribution: ContentDistribution{
			FeedDistribution:               "MAIN_FEED",
			TargetEntities:                 nil,
			ThirdPartyDistributionChannels: nil,
		},
		LifecycleState:            "PUBLISHED",
		IsReshareDisabledByAuthor: false,
		Content: PostContent{
			Poll: PollInfo{
				Question: "Do you have problem posting same content across mutiple social platforms (Linkedin, Twitter and others)?",
				Options: []PollOptions{
					{
						Text: "Yes, a lot",
					},
					{
						Text: "Sometimes",
					},
					{
						Text: "Not much, Manageable",
					},
				},
				Settings: PollSettings{
					Duration: "THREE_DAYS",
				},
			},
		},
	}

	body, _ := json.Marshal(requestBody)

	resp, err := http.Post(postOnFeedURN, "", strings.NewReader(string(body)))
	if err != nil {
		plogger.Error("Error getting the account URN!", err)
		return "", errors.New("post creation Failed")
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", errors.New("post creation Failed")
	}

	return "success", nil
}

const accountLinkedinURNEndpoint = "https://api.linkedin.com/v2/me"

func fetchLinkedinAccountURN(accessToken string) string {
	// get user id from the endpoint and
	req, err := http.NewRequest(http.MethodGet, accountLinkedinURNEndpoint, nil)
	req.Header.Set("Authorization", "Bearer "+accessToken)

	// Send the HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the account URN!", err)
		return ""
	}

	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	return responseBody.Id
}

var responseBody struct {
	LocalizedLastName  string      `json:"localizedLastName"`
	ProfilePicture     interface{} `json:"profilePicture"`
	FirstName          interface{} `json:"firstName"`
	LastName           interface{} `json:"lastName"`
	Id                 string      `json:"id"`
	LocalisedFirstName string      `json:"localizedFirstName"`
}
