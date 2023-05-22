package linkedinservice

import (
	"context"
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"socialhub-server/api/auth"
	"socialhub-server/model/models"
	"socialhub-server/model/models/linkedin"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
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

func (ServiceImpl) CreateALinkedinPoll(accessToken string, pollContent *models.LinkedInFeedPostContentPoll) (string, error) {
	urn := fetchLinkedinAccountURN(accessToken) // "urn:li:person:m55DJ0ZigA"

	plogger.Debug("urn fetched from", urn)
	plogger.Info("")

	pollContent.Author = urn

	requestBody := pollContent
	body, _ := json.Marshal(requestBody)
	plogger.Debug(string(body))
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

	plogger.Info(req.Header)
	// Send the HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the account URN!", err)
		return ""
	}

	if resp.StatusCode != http.StatusOK {
		plogger.Error("Request to fetch URN failed! ", resp.StatusCode)
		return ""
	}

	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	if err != nil {
		plogger.Error("Error decoding response body!", err)
		return ""
	}

	plogger.Debug("Error decoding response body!", responseBody.Id, responseBody.FirstName, responseBody.ProfilePicture)

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

func (ServiceImpl) CreateALinkedinTextPost(accessToken string, content *models.LinkedInFeedPostContent) (string, error) {
	urnId := fetchLinkedinAccountURN(accessToken) // "urn:li:person:m55DJ0ZigA"

	args := db.SaveLinkedinURNParams{
		OrganisationGroupID: "org_yogveda",
		UserEmail:           auth.GetCurrentUser(),
		LinkedinUrn:         createURN("person", urnId),
	}
	out, err := store.GetInstance().SaveLinkedinURN(context.Background(), args)
	plogger.Info(out)

	plogger.Debug(`account urn:`, createURN("person", urnId))
	plogger.Info(`account urn:`, urnId)

	content.Author = createURN("person", urnId)
	requestBody := content
	body, _ := json.Marshal(requestBody)
	plogger.Debug("post request body ", string(body))
	req, err := http.NewRequest(http.MethodPost, postOnFeedURN, strings.NewReader(string(body)))
	if err != nil {
		plogger.Error("Creating Request Object for Linkedin post API failed! ", err)
		return "", err
	}
	plogger.Debug("access Token ", accessToken)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+accessToken)
	req.Header.Set("LinkedIn-Version", "202304")
	req.Header.Set("X-Restli-Protocol-Version", "2.0.0")

	plogger.Debug(req.Header.Get("Authorization"))

	plogger.Debug(req.Header.Get("Authorization"))

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the account URN! ", err)
		return "", errors.New("post creation Failed")
	}
	body, err = ioutil.ReadAll(resp.Body)

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		plogger.Error("Error creating post on linkedin :")
		plogger.Debug("resp status code ", resp.StatusCode)
		plogger.Debug("resp Header ", resp.Header)
		plogger.Debug("resp body ", string(body))
		return "", errors.New("post creation Failed")
	}

	return "success", nil
}

func createURN(resourceType string, urnId string) string {
	switch resourceType {
	case "person":
		return "urn:li:person:" + urnId
	case "organisation":
		return "urn:li:organisation:" + urnId
	default:
		return ""
	}
}
