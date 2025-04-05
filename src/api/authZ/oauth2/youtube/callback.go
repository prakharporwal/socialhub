package youtube

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/api/authZ"
	"socialhub-server/env"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

const ERROR = "error"
const ERROR_DESCRIPTION = "error_description"
const LINKEDIN_ACCESS_TOKEN_REQUEST_URL = "https://www.linkedin.com/oauth/v2/accessToken"

// GetAccessToken
// use the authorization code to get the access code
func OAuth2Callback(ctx *gin.Context) {
	//code, clientID, clientSecret, redirectURI string, grant_type,
	//set up the HTTP POST request to exchange the authorization code for an access token
	errParam, ok := ctx.GetQuery(ERROR)
	if ok {
		errDescription, _ := ctx.Params.Get(ERROR_DESCRIPTION)
		plogger.Error("oauth callback failed!", errParam, errDescription)
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Something went wrong!"})
		return
	}

	//state, ok := ctx.GetQuery("state")
	//if !ok {
	//	plogger.Error("state value missing! the oauth process failed due to this ! cannot check for! CSRF attack")
	//	return
	//}

	//tokenMaker, _ := authZ.NewPasetoMaker()
	//_, err := tokenMaker.VerifyToken(state)
	//if err != nil {
	//	plogger.Error("Token Verification Failed! Cannot validate oauth callback state ! Cannot check for CSRF attack!", err.Error())
	//	ctx.AbortWithStatusJSON(http.StatusForbidden, apierror.Forbidden)
	//	return
	//}

	code, ok := ctx.GetQuery(CODE)
	if !ok {
		plogger.Info(code)
		plogger.Error(ok)
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Auth Code Param is not valid!"})
		return
	}
	plogger.Info(code)

	//TODO : Make secret storage more secure using hashing, HMAC, or some other algo

	redirectURI := env.ApiURL + "/api/youtube/oauth2/access/callback"

	postData := url.Values{}
	postData.Set("grant_type", "authorization_code")
	postData.Set("code", code)
	postData.Set("client_id", env.YoutubeAppClientId)
	postData.Set("client_secret", env.YoutubeAppClientSecret)
	postData.Set("redirect_uri", redirectURI)

	//map go to json for body
	// body := strings.NewReader( json.Marshal(postData))
	// plogger.Info("access token request body", body)
	url := env.YoutubeAccessTokenRetrievalUrl + "?" + postData.Encode()
	plogger.Info("request url :", url)

	req, err := http.NewRequest("POST", url, nil)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error creating the oauth token request!"})
		return
	}

	req.Header.Add("Content-Type", "application/x-www-form-urlencoded")

	// Send the HTTP request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Error("Error getting the oauth token!", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error getting the oauth token!"})
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
		ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error getting the oauth token!"})
		return
	}

	// store token in database or redis
	// encrypt linkedin access token
	//encryptedToken, err := bcrypt.GenerateFromPassword([]byte(tokenResp.AccessToken), appconstants.BCRYPT_COST)

	args := sqlcmodels.AppAccountOauth2AccessTokens_SaveTokenParams{
		AppName:             authZ.YOUTUBE,
		AccessToken:         tokenResp.AccessToken,
		RefreshToken:        tokenResp.RefreshToken,
		UserEmail:           authZ.GetCurrentUser(),
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		TokenScope:          tokenResp.Scope,
		ExpiresAt:           time.Now().Add(time.Duration(tokenResp.ExpiresInSeconds) * time.Millisecond),
	}

	plogger.Debug("Linkedin AccessToken Encrypted", args.AccessToken)
	row, err := store.GetInstance().AppAccountOauth2AccessTokens_SaveToken(ctx, args)
	if err != nil {
		plogger.Error("Failed Saving the access token!", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}
	plogger.Debug(row.UserEmail, " ", row.TokenScope)
	ctx.Redirect(http.StatusTemporaryRedirect, env.WebsiteURL+"/app/youtube")
	//ctx.JSON(http.StatusOK, gin.H{"email": row.UserEmail, "scope": row.Scope})
}
