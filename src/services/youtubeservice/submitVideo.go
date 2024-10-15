package youtubeservice

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/pkg/plogger"
)

// docs: https://developers.google.com/youtube/v3/docs/videos/insert
// this is the API explorer
func sendVideoToYoutube(ctx *gin.Context) {

	// getYoutubeAccessTokens
	// send a API request to youtube api with video and other details struggling with this
	// get the success response from youtube and save in db
	url := "https://www.googleapis.com/upload/youtube/v3/videos"

	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error creating the oauth token request!"})
		return
	}

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	// Send the HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the oauth token!", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
		return
	}

	defer resp.Body.Close()

	// Parse the JSON response to get the access token
	//{
	//	"access_token": "1/fFAGRNJru1FTz70BzhT3Zg",
	//	"expires_in": 3920,
	//	"token_type": "Bearer",
	//	"scope": "https://www.googleapis.com/auth/drive.metadata.readonly",
	//	"refresh_token": "1//xEoDL4iW3cxlI7yDbSRFYNG01kVKM2C-259HOF2aQbI"
	//}

	var tokenResp struct {
		AccessToken      string `json:"access_token"`
		RefreshToken     string `json:"refresh_token"`
		ExpiresInSeconds int64  `json:"expires_in"`
		Scope            string `json:"scope"`
		TokenType        string `json:"token_type"`
	}

	err = json.NewDecoder(resp.Body).Decode(&tokenResp)
	if err != nil {
		plogger.Error("Failed JSON decoding of response")
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
		return
	}

}
