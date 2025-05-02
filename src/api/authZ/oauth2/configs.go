package oauth2

import (
	"socialhub-server/env"
	"socialhub-server/model/datamodels/enums"
	"strings"
)

var OAuth2AppConfig = map[enums.SocialMediaPlatforms]map[string]string{
	enums.LINKEDIN: {
		"client_id":            "777tjn7kotod8h",
		"client_secret":        "I3ZZqOReGsbfOQ2F",
		"redirect_uri":         env.LINKEDIN_OAUTH_REDIRECT_URL,
		"scope":                strings.Join([]string{"openid", "w_member_social", "profile", "email"}, " "),
		"response_type":        "code",
		"oauth2_authorize_url": env.LINKEDIN_GET_AUTHORISATION_CODE_URL,
		"access_token_url":     "https://www.linkedin.com/oauth/v2/accessToken",
	},
	enums.TWITTER: {
		"client_id":             env.TwitterAppClientId,
		"client_secret":         env.TwitterAppClientSecret,
		"redirect_uri":          env.TwitterOAuth2Callback,
		"scope":                 strings.Join([]string{"tweet.read", "tweet.write", "users.read", "offline.access"}, " "),
		"response_type":         "code",
		"code_challenge":        "challenge",
		"code_challenge_method": "plain",
		"oauth2_authorize_url":  env.TwitterOAuth2AuthorizeUrl,
		"access_token_url":      env.TwitterAccessTokenUrl,
	},
	enums.YOUTUBE: {
		"client_id":            env.YoutubeAppClientId,
		"client_secret":        env.YoutubeAppClientSecret,
		"redirect_uri":         env.YoutubeRedirectUriEndpoint,
		"scope":                strings.Join([]string{"https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/youtube.upload"}, " "),
		"response_type":        "code",
		"oauth2_authorize_url": env.YoutubeOAuth2AuthorisationUrl,
		"access_token_url":     env.YoutubeAccessTokenRetrievalUrl,
	},
}
