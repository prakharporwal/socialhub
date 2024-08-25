package env

const (
	DBSource     = "postgres://admin:password@localhost:5432/postgres?sslmode=disable"
	DBDriver     = "postgres"
	SymmetricKey = "TjWnZr4u7x!A%D*G-KaPdSgUkXp2s5v8"
	WebsiteURL   = "http://localhost:4000"
	ServerPort   = 8080
)

const (
	LINKEDIN_OAUTH_REDIRECT_URL         = "http://localhost:4000/api/linkedin/oauth/access/callback"
	LINKEDIN_GET_AUTHORISATION_CODE_URL = "https://www.linkedin.com/oauth/v2/authorization"
	AESEncryptionKey                    = "lmov567IN6&hj87Hko^$*IUNu3kwp+85"
)

const (
	TwitterAppClientId     = "T0d6MDNldDZNR19yU29xbFBTb3k6MTpjaQ"
	TwitterAppClientSecret = "2Qf7eGgae5W0J95J6eVoAm2lOfM58pXh1-Kzqy5yESc_f83dGO"
	TwitterAccessTokenUrl  = "https://api.twitter.com/2/oauth2/token"
	TwitterOAuth2Callback  = "http://localhost:4000/api/twitter/oauth2/access/callback"
)

const (
	InstagramOAuthAuthorisationUrl = "https://api.instagram.com/oauth/authorize"
	InstagramAppClientSecret
)
