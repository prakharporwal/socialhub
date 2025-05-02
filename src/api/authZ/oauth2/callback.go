package oauth2

import (
	"net/http"
	"net/url"
	"socialhub-server/env"
	"socialhub-server/model/datamodels/enums"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

// 1. receive auth code and state
// 2. validate request state
// 3. exchange auth code for access token
// 4. save access token in db
// 5. fetch user id, username for that platform
// 6. redirect to frontend with success message to home page ?

func OAuth2Callback(ctx *gin.Context) {
	provider, ok := ctx.Params.Get("provider")
	if !ok {
		plogger.Error("Provider param not valid", provider)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "bad request: invalid provider key"})
		return
	}

	platform, ok := enums.ParseSocialMediaPlatforms(provider)
	if !ok {
		plogger.Error("No valid OAuth2 Provider configured for:", provider)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "error: provider not found"})
		return
	}

	config := OAuth2AppConfig[platform]
	code, ok := ctx.GetQuery("code")
	if !ok {
		plogger.Info(code)
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Auth Code Param is not valid!"})
		return
	}

	// generate query params
	queryData := url.Values{}

	queryData.Add("code", code)
	queryData.Add("grant_type", "authorization_code")
	queryData.Add("client_id", config["client_id"])
	queryData.Add("redirect_uri", config["oauth2_redirect_url"])
	// todo: use a complex code_verifier
	queryData.Add("code_verifier", config["challenge"])

	reqUrl := config["access_token_url"] + "?" + queryData.Encode()

	req, _ := http.NewRequest("POST", reqUrl, nil)
	req.Header.Add("content-type", "application/x-www-form-urlencoded")
	req.SetBasicAuth(config["client_id"], config["client_secret"])

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		plogger.Info("error getting tweets from twitter ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		plogger.Error(" Getting Access Token API call failed ! ")
		plogger.Debug(resp.StatusCode, resp.Status, resp.Header)
	}

	// var respBody struct {
	// 	AccessToken           string        `json:"access_token"`
	// 	RefreshToken          string        `json:"refresh_token"`
	// 	Scope                 string        `json:"scope"`
	// 	TokenType             string        `json:"token_type"`
	// 	ExpiresInMicroseconds time.Duration `json:"expires_in"`
	// }

	// err = json.NewDecoder(resp.Body).Decode(&respBody)
	// if err != nil {
	// 	plogger.Error("Failed JSON decoding of response ", err)
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Error getting the oauth token!"})
	// 	return
	// }

	// args := sqlcmodels.TwitterAccountAccessTokens_saveAccessTokenParams{
	// 	AccessToken:         respBody.AccessToken,
	// 	RefreshToken:        respBody.RefreshToken,
	// 	UserEmail:           authZ.GetCurrentUser(),
	// 	OrganisationGroupID: authZ.GetCurrentOrganisationId(),
	// 	TokenScope:          respBody.Scope,
	// 	TokenType:           respBody.TokenType,
	// 	ExpiresAt:           time.Now().Add(respBody.ExpiresInMicroseconds * time.Second),
	// }

	// row, err := store.GetInstance().TwitterAccountAccessTokens_saveAccessToken(ctx, args)
	// if err != nil {
	// 	plogger.Error("Error saving the token to database ", err)
	// 	ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
	// 	return
	// }
	// plogger.Info(row.UserEmail)
	// plogger.Info("scope from db response ", row.TokenScope)

	ctx.Redirect(http.StatusFound, env.WebsiteURL+"?twitter=success")
}
