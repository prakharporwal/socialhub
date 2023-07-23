package crons

import (
	"context"
	"encoding/json"
	"github.com/robfig/cron/v3"
	"net/http"
	"net/url"
	"socialhub-server/api/auth"
	"socialhub-server/env"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"time"
)

const tokenRefreshedInSingleRun = 100

func RefreshJob() {
	plogger.Info("Reading from db cron job")

	c := cron.New()
	// cron job runs every 100 minutes
	entryId, err := c.AddFunc("@every 100m", fetchFromDBAndRefresh)
	if err != nil {
		plogger.Error("Scheduling Cron Job failed! ", err)
	}
	plogger.Info("Scheduled Cron Id: ", entryId)
	c.Start()
}

// TriggerRefreshJob triggers the cron job
// pull all rows in twitter_account_access_tokens table
// request new tokens
func fetchFromDBAndRefresh() {
	rows, err := store.GetInstance().TwitterAccountAccessTokens_fetchAll(context.Background(), tokenRefreshedInSingleRun)
	if err != nil {
		plogger.Error("Failed to fetch twitter accounts from db! ", err)
		return
	}

	for _, row := range rows {
		plogger.Info("running for ", row.TwitterUsername)
		refreshTokenAPICall(row.OrganisationGroupID, row.UserEmail, row.AccessToken, row.RefreshToken)
	}
}

// refreshTokenCron is for fetching token from twitter in
// exchange for existing accessToken and refreshToken
func refreshTokenAPICall(organisationGroupId string, userEmail string, accessToken string, refreshToken string) {
	// fetch refresh token from db
	// fetch all from the db as it is cron job we don't have a current user

	// call twitter to get a new refresh token
	queryData := url.Values{}
	queryData.Add("grant_type", "refresh_token")
	queryData.Add("client_id", env.TwitterAppClientId)
	// todo: use a complex code_verifier
	queryData.Add("refresh_token", refreshToken)

	reqUrl := env.TwitterAccessTokenUrl + "?" + queryData.Encode()

	req, err := http.NewRequest("POST", reqUrl, nil)
	req.Header.Add("content-type", "application/x-www-form-urlencoded")
	//req.Header.Add("Authorization", accessToken)

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Info("error getting tweets from twitter ", err)
		return
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		plogger.Error(" Getting Access Token API call failed ! ")
		plogger.Debug(resp.StatusCode)
		plogger.Debug(resp.Status)
		plogger.Debug(resp.Header)
	}

	var respBody struct {
		AccessToken           string        `json:"access_token"`
		RefreshToken          string        `json:"refresh_token"`
		Scope                 string        `json:"scope"`
		TokenType             string        `json:"token_type"`
		ExpiresInMicroseconds time.Duration `json:"expires_in"`
	}

	err = json.NewDecoder(resp.Body).Decode(&respBody)
	if err != nil {
		plogger.Error("Failed JSON decoding of response ", err)
		return
	}

	args := sqlcmodels.TwitterAccountAccessTokens_saveAccessTokenParams{
		AccessToken:         respBody.AccessToken,
		RefreshToken:        respBody.RefreshToken,
		UserEmail:           auth.GetCurrentUser(),
		OrganisationGroupID: auth.GetCurrentOrganisationId(),
		TokenScope:          respBody.Scope,
		ExpiresAt:           time.Now().Add(respBody.ExpiresInMicroseconds * time.Second),
	}

	row, err := store.GetInstance().TwitterAccountAccessTokens_saveAccessToken(context.Background(), args)

	if err != nil {
		plogger.Error("Error saving the token to database ", err)
		return
	}
	plogger.Info("Success refreshing twitter token for ", organisationGroupId, row.UserEmail)
}
