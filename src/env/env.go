package env

const (
	DBSource     = "postgres://admin:password@localhost:5432/socialhub?sslmode=disable"
	DBDriver     = "postgres"
	SymmetricKey = "TjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8"
	WebsiteURL   = "http://localhost:3000"
	ApiURL       = "http://localhost:8080"
	ServerPort   = 8080
)

const (
	LINKEDIN_OAUTH_REDIRECT_URL         = ApiURL + "/api/linkedin/oauth/access/callback"
	LINKEDIN_GET_AUTHORISATION_CODE_URL = "https://www.linkedin.com/oauth/v2/authorization"
	AESEncryptionKey                    = "lmov567IN6&hj87Hko^$*IUNu3kwp+85"
)

const (
	TwitterAppClientId        = "T0d6MDNldDZNR19yU29xbFBTb3k6MTpjaQ"
	TwitterAppClientSecret    = "2Qf7eGgae5W0J95J6eVoAm2lOfM58pXh1-Kzqy5yESc_f83dGO"
	TwitterOAuth2AuthorizeUrl = "https://twitter.com/i/oauth2/authorize"
	TwitterAccessTokenUrl     = "https://api.twitter.com/2/oauth2/token"
	TwitterOAuth2Callback     = ApiURL + "/api/twitter/oauth2/access/callback"
)

const (
	InstagramOAuthAuthorisationUrl = "https://api.instagram.com/oauth/authorize"
	InstagramAppClientId           = "549927650729584"
	InstagramAppClientSecret       = "2SOSGddMxfUL8vlZ"
)

const (
	YoutubeAppClientId             = "275890100845-5g43suiqmcca22g7gnhf1oj5094sgiqu.apps.googleusercontent.com"
	YoutubeAppClientSecret         = "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"
	YoutubeOAuth2AuthorisationUrl  = "https://accounts.google.com/o/oauth2/v2/auth"
	YoutubeAccessTokenRetrievalUrl = "https://accounts.google.com/o/oauth2/token"
	YoutubeRedirectUriEndpoint     = ApiURL + "/api/youtube/oauth2/access/callback"
)
