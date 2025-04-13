package linkedinservice

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"socialhub-server/api/authZ"
	"socialhub-server/model/datamodels"
	"socialhub-server/model/datamodels/linkedin"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"
	"strings"
	"time"

	"github.com/google/uuid"
)

type service interface {
	CreateALinkedinPoll(accessToken string, pollContent datamodels.LinkedInFeedPostContent)
	CreateALinkedinTextPost(accessToken string, content datamodels.LinkedInFeedPostContent)
}

type ServiceImpl struct {
}

const postOnFeedURN = "https://api.linkedin.com/rest/posts"

type linkedInFeedPostRequest struct {
	ContentType linkedin.LinkedinContentType `json:"content_type" binding:"required,oneof=text poll"`
	Data        interface{}                  `json:"data" binding:"required"`
}

func (ServiceImpl) CreateALinkedinPoll(accessToken string, pollContent *datamodels.LinkedInFeedPostContent) (string, error) {
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

const accountLinkedinURNEndpoint = "https://api.linkedin.com/v2/userinfo"

// fetchLinkedinAccountURN looks for user info from linkedin using token
// from uri: accountLinkedinURNEndpoint -> https://api.linkedin.com/v2/me
func fetchLinkedinAccountURN(accessToken string) string {
	// get user id from the endpoint and
	req, _ := http.NewRequest(http.MethodGet, accountLinkedinURNEndpoint, nil)
	req.Header.Set("X-RestLi-Protocol-Version", "2.0.0")
	req.Header.Set("Authorization", "Bearer "+accessToken)

	// Send the HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the account URN!", err)
		return ""
	}

	var responseBody map[string]interface{}
	//struct {
	//	LocalizedLastName  string      `json:"localizedLastName"`
	//	ProfilePicture     interface{} `json:"profilePicture"`
	//	FirstName          interface{} `json:"firstName"`
	//	LastName           interface{} `json:"lastName"`
	//	Id                 string      `json:"id"`
	//	LocalisedFirstName string      `json:"localizedFirstName"`
	//}

	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&responseBody)
	if err != nil {
		plogger.Error("Error decoding response body!", err)
		return ""
	}

	if resp.StatusCode != http.StatusOK {
		plogger.Error("Request to fetch URN failed! ", resp.StatusCode)
		return ""
	}

	//plogger.Debug("Error decoding response body!", responseBody.Id, responseBody.FirstName, responseBody.ProfilePicture)
	var out = responseBody["sub"].(string)
	plogger.Debug(out)

	return out
}

func (ServiceImpl) CreateALinkedinTextPost(accessToken string, content *datamodels.LinkedInFeedPostContent) (string, error) {
	urnId := fetchLinkedinAccountURN(accessToken) // "urn:li:person:m55DJ0ZigA"

	args := sqlcmodels.SaveLinkedinURNParams{
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		UserEmail:           authZ.GetCurrentUser(),
		LinkedinUrn:         createURN("person", urnId),
	}
	out, _ := store.GetInstance().SaveLinkedinURN(context.Background(), args)
	plogger.Info(out)

	plogger.Info(`account urn:`, urnId)
	// content.Author = createURN("person", urnId)

	postId, err := SendPostToLinkedin(*content, accessToken)

	// todo: write query to update the postId in the database for delete and other actions across linkedin
	plogger.Debug(postId)

	if err != nil {
		plogger.Error("Failed while sending post to linkedin ", err)
		return "", err
	}

	argsPersistPost := sqlcmodels.ScheduleAUserPostOnLinkedinParams{
		ScheduledPostID:  uuid.NewString(),
		AccountID:        1234,
		AuthorUrn:        content.Author,
		PostType:         "text",
		PostIDOnLinkedin: "lol",
		PostJsonString:   "{}",
		Status:           "SUBMITTED",
		CreatedBy:        authZ.GetCurrentOrganisationId() + " | " + authZ.GetCurrentUser(),
		ScheduledTime:    time.Now().UTC().Add(10 * time.Minute),
	}

	out2, err := store.GetInstance().ScheduleAUserPostOnLinkedin(context.Background(), argsPersistPost)
	if err != nil {
		plogger.Error("failed to add post for scheduling in database ", err)
		//return
	}

	plogger.Info("post added to db!", out2.ScheduledPostID)

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

func SendPostToLinkedin(bodyJsonString datamodels.LinkedInFeedPostContent, linkedinAccessToken string) (string, error) {
	req, err := http.NewRequest(http.MethodPost, postOnFeedURN, strings.NewReader(utils.Stringify(bodyJsonString)))
	if err != nil {
		plogger.Error("Creating Request Object for Linkedin post API failed! ", err)
		return "", err
	}

	plogger.Debug("access Token ", linkedinAccessToken)
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+linkedinAccessToken)
	req.Header.Set("LinkedIn-Version", "202404")
	req.Header.Set("X-Restli-Protocol-Version", "2.0.0")

	plogger.Debug(req.Header.Get("Authorization"))

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the account URN! ", err)
		return "", errors.New("post creation Failed")
	}

	body, _ := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	plogger.Debug("Header:", resp.Header.Clone())
	plogger.Debug("Status code is ", resp.StatusCode)

	if resp.StatusCode != http.StatusOK && resp.StatusCode != http.StatusCreated {
		plogger.Error("Error creating post on linkedin :")
		plogger.Debug("resp status code ", resp.StatusCode)
		plogger.Debug("resp Header ", resp.Header)
		plogger.Debug("resp body ", string(body))
		return "", errors.New("post creation Failed")
	}

	var postId = resp.Header.Get("X-Restli-Id")
	plogger.Debug("Post Id: ", postId)

	return postId, nil
}
