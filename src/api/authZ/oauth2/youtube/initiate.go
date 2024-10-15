package youtube

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"net/url"
	"socialhub-server/api/authZ"
	"socialhub-server/env"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"strings"
	"time"
)

const MESSAGE = "message"
const CODE = "code"

// FetchAuthCode get Auth Code from LinkedIn OAuth 2
func OAuth2Initiate(ctx *gin.Context) {
	plogger.Debug("Fetching linkedin Auth Code!")
	//	https://accounts.google.com/o/oauth2/v2/auth?
	//	scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&
	//	include_granted_scopes=true&
	//		response_type=token&
	//		state=state_parameter_passthrough_value&
	//		redirect_uri=https%3A//oauth2.example.com/code&
	//		client_id=client_id

	//	generate a JWT For callback and user identification
	// 	and pass as a state then it should be valid for a minute.
	tm, _ := authZ.NewPasetoMaker()

	oauthJwtToken, err := tm.CreateToken(authZ.GetCurrentUser(), authZ.GetCurrentOrganisationId(), 1*time.Minute)
	if err != nil {
		plogger.Error("Error creating state for oauth callback! ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	responseType := "code"
	redirectURI := env.YoutubeRedirectUriEndpoint

	// see all scopes here: https://developers.google.com/youtube/v3/guides/auth/installed-apps
	scopeForYoutubeProfile := "https://www.googleapis.com/auth/youtube"
	scopeForYoutubeUpload := "https://www.googleapis.com/auth/youtube.upload"
	scopeForViewProfile := "https://www.googleapis.com/auth/youtube.readonly"

	scopeList := []string{scopeForYoutubeProfile, scopeForYoutubeUpload, scopeForViewProfile}
	scope := strings.Join(scopeList, " ")
	getDataParams := url.Values{}
	getDataParams.Set("response_type", responseType)
	// for long lived token with refresh token present
	getDataParams.Set("access_type", "offline")
	getDataParams.Set("client_id", env.YoutubeAppClientId)
	getDataParams.Set("redirect_uri", redirectURI)
	getDataParams.Set("state", oauthJwtToken)
	getDataParams.Set("scope", scope)
	getDataParams.Set("prompt", "consent")

	url := env.YoutubeOAuth2AuthorisationUrl + "?" + getDataParams.Encode()

	//resp, err := http.Get(url)
	//if err != nil {
	//	ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error getting the oauth token!"})
	//	return
	//}
	//defer resp.Body.Close()
	//
	//// Parse the JSON response to get the access token
	//var code interface{}
	//
	//plogger.Debug(resp.Body)
	//err = json.NewDecoder(resp.Body).Decode(&code)
	//if err != nil {
	//	plogger.Info(code)
	//	plogger.Error(err)
	//	ctx.JSON(http.StatusInternalServerError, gin.H{MESSAGE: "Error parsing the oauth token!"})
	//	return
	//}

	plogger.Debug("redirecturl: ", url)

	ctx.JSON(http.StatusOK, gin.H{"redirect_uri": url})
}
