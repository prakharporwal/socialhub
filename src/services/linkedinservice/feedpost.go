package linkedinservice

import (
	"encoding/json"
	"errors"
	"net/http"
	"socialhub-server/model/models"
	"socialhub-server/model/models/linkedin"
	"socialhub-server/pkg/plogger"
	"strings"
)

type service interface {
	CreateALinkedinPoll(accessToken string, pollContent models.LinkedInFeedPostContentPoll)
	CreateALinkedinTextPost(accessToken string, content models.LinkedInFeedPostContent)
}

type ServiceImpl struct {
}

const postOnFeedURN = "https://api.linkedin.com/rest/posts"

type linkedInFeedPostRequest struct {
	ContentType linkedin.LinkedinContentType `json:"content_type" binding:"required,oneof=text poll"`
	Data        interface{}                  `json:"data" binding:"required"`
}

func (ServiceImpl) CreateALinkedinPoll(accessToken string, pollContent models.LinkedInFeedPostContentPoll) (string, error) {
	urn := fetchLinkedinAccountURN(accessToken) // "urn:li:person:m55DJ0ZigA"
	pollContent.Author = urn

	requestBody := pollContent
	body, _ := json.Marshal(requestBody)

	resp, err := http.Post(postOnFeedURN, "application/json", strings.NewReader(string(body)))
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

// fetchLinkedinAccountURN looks for user info from linkedin using token
// from uri: accountLinkedinURNEndpoint -> https://api.linkedin.com/v2/me
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

func (ServiceImpl) CreateALinkedinTextPost(accessToken string, content models.LinkedInFeedPostContent) (string, error) {
	urn := fetchLinkedinAccountURN(accessToken) // "urn:li:person:m55DJ0ZigA"
	plogger.Debug("account urn:", urn)

	content.Author = urn
	requestBody := content
	body, _ := json.Marshal(requestBody)
	req, err := http.NewRequest(http.MethodPost, postOnFeedURN, strings.NewReader(string(body)))

	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+accessToken)

	resp, err := http.DefaultClient.Do(req)
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
