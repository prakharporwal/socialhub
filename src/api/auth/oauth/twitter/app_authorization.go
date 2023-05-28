package twitter

/// steps
// request token via POST call
// use the oauth token to call oauth/authorize
// {gets redirected}
//

const twitterRequestTokenUrl = "https://api.twitter.com/oauth/request_token"
const twitterAuthorizationUrl = "https://api.twitter.com/oauth/authorize"

type responseBody struct {
	OAuthToken             string `json:"oauth_token"`
	OAuthTokenSecret       string `json:"oauth_token_secret"`
	OAuthCallbackConfirmed bool   `json:"oauth_callback_confirmed"`
}

//
//func RequestAccess(ctx *gin.Context) {
//	redirectParams := map[string]interface{}{}
//	redirectParams["oauth_callback"] = twitterOAuthCallback
//	redirectParams["oauth_consumer_key"] = "qdVQOpAp7RiUzgUUOtdIFUzlB"
//
//	//oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0
//	//oauth_token_secret=veNRnAWe6inFuo8o2u8SLLZLjolYDmDP7SzL0YfYI
//	//oauth_callback_confirmed=true
//	byteArr, err := json.Marshal(redirectParams)
//	reqUrl := twitterRequestTokenUrl
//
//	req, err := http.NewRequest("POST", reqUrl, strings.NewReader(string(byteArr)))
//	if err != nil {
//		plogger.Error(err)
//		ctx.JSON(http.StatusOK, apierror.UnexpectedError)
//		return
//	}
//
//	resp, err := http.DefaultClient.Do(req)
//	if err != nil {
//		plogger.Error(err)
//		plogger.Info(resp)
//	}
//
//	defer resp.Body.Close()
//
//	var body responseBody
//	err = json.NewDecoder(resp.Body).Decode(&body)
//	if err != nil {
//		// error decoding request token response body
//		plogger.Error("error decoding request token response body ", err)
//	}
//
//	if resp.StatusCode != http.StatusOK {
//		plogger.Info(resp.StatusCode)
//		plogger.Error("request to twitter request_access failed")
//	}
//
//	plogger.Info(body.OAuthToken)
//
//	if !body.OAuthCallbackConfirmed {
//		plogger.Error("error twitter oauth callback confirmed is false. cannot proceed for authorization ", body.OAuthCallbackConfirmed)
//		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
//		return
//	}
//
//	urlParams := url.Values{}
//	urlParams.Set("oauth_token", body.OAuthToken)
//
//	redirectUrl := twitterAuthorizationUrl + "?" + urlParams.Encode()
//	ctx.Redirect(http.StatusFound, redirectUrl)
//}
//
//func InitiateAuthorization(ctx *gin.Context) {
//
//	redirectParams := url.Values{}
//	redirectParams.Set("x_auth_access_type", "write")
//	redirectParams.Set("oauth_callback", twitterOAuthCallback)
//	//redirectParams.Set("redirect_uri", redirectURI)
//	//redirectParams.Set("state", oauthJwtToken)
//	//redirectParams.Set("scope", scope)
//
//	twitterAuthRedirect := twitterAuthorizationUrl
//
//	ctx.Redirect(http.StatusFound, twitterAuthRedirect)
//
//	ctx.JSON(http.StatusOK, gin.H{"message": "success"})
//}
