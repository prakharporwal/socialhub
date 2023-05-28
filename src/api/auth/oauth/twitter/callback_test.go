package twitter

import (
	models "socialhub-server/model/sqlc"
	"testing"
)

func TestServiceTwitterAccessTokenSave(t *testing.T) {

	t.Run("Data should be stored in DB", func(t *testing.T) {
		args := models.SaveTwitterAccessTokenParams{
			AccessToken: "access-token",
			UserEmail:   "fakem@mail.com",
			Scope:       "users.read tweet.read offline.access",
		}
		serviceTwitterAccessTokenSave(args)
	})
}
