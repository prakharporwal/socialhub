package postingservice

import (
	"context"
	"socialhub-server/api/authZ"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

type TwitterPlatformPostingService struct {
	AccessToken string
}

func NewTwitterPlatformPostingService() *TwitterPlatformPostingService {
	args := sqlcmodels.TwitterAccountAccessTokens_findAccessTokenParams{
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		UserEmail:           authZ.GetCurrentUser(),
	}

	row, err := store.GetInstance().TwitterAccountAccessTokens_findAccessToken(context.Background(), args)
	if err != nil {
		plogger.Error("Error getting bearer token from db! ", err)
		return nil
	}

	return &TwitterPlatformPostingService{AccessToken: row.AccessToken}
}

func (ps *TwitterPlatformPostingService) CreatePost(postContent ContentModel) (string, error) {
	return "id", nil
}

func (ps *TwitterPlatformPostingService) UpdatePost(postId string, postContent ContentModel) error {
	return nil
}

func (ps *TwitterPlatformPostingService) DeletePost(postId string) error {
	return nil
}
