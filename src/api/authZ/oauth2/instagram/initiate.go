package instagram

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

// fixme: use in env secret
const clientId = env.InstagramAppClientId

// fixme: use in env secret
const clientSecret = env.InstagramAppClientSecret

// FetchAuthCode get Auth Code from LinkedIn OAuth 2
func OAuth2Initiate(ctx *gin.Context) {
	plogger.Debug("Fetching linkedin Auth Code!")
	/// GET https://api.instagram.com/oauth/authorize
	//	?client_id={app-id},
	//	&redirect_uri={redirect-uri},
	//	&response_type=code,
	//	&scope={scope}

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
	redirectURI := env.ApiURL + "/api/instagram/oauth/access/callback"

	scopeForPublicProfile := "public_profile"
	//https://developers.facebook.com/docs/permissions#instagram_basic
	scopeForBasicUserDetails := "instagram_basic"
	//https://developers.facebook.com/docs/permissions#instagram_content_publish
	scopeForContentPublishing := "instagram_content_publish"
	scopeList := []string{scopeForPublicProfile, scopeForBasicUserDetails, scopeForContentPublishing}
	scope := strings.Join(scopeList, " ")
	getDataParams := url.Values{}
	getDataParams.Set("response_type", responseType)
	getDataParams.Set("client_id", clientId)
	getDataParams.Set("redirect_uri", redirectURI)
	getDataParams.Set("state", oauthJwtToken)
	getDataParams.Set("scope", scope)

	url := env.InstagramOAuthAuthorisationUrl + "?" + getDataParams.Encode()

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
