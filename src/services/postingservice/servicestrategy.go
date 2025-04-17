package postingservice

import (
	"context"
	"socialhub-server/api/authZ"
	"socialhub-server/model/datamodels/enums"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

type PostingStrategy interface {
	GetStrategy(platform enums.SocialMediaPlatforms) SocialMediaPlatformPostingService
}

type SocialMediaPlatformStrategy struct {
}

func (s *SocialMediaPlatformStrategy) GetStrategy(platform enums.SocialMediaPlatforms) SocialMediaPlatformPostingService {
	accessToken := s.FetchSocialMediaAccessToken(platform)

	switch platform {
	case enums.LINKEDIN:
		return &LinkedinPlatformPostingService{AccessToken: accessToken}
	case enums.TWITTER:
		return &TwitterPlatformPostingService{AccessToken: accessToken}
	default:
		plogger.Info("SocialMediaPlatformStrategy unknown platform", platform)
		return nil
	}
}

func (s *SocialMediaPlatformStrategy) FetchSocialMediaAccessToken(platform enums.SocialMediaPlatforms) string {
	args := sqlcmodels.SocialMediaAccount_fetchAccessTokenParams{
		UserEmail:           authZ.GetCurrentUser(),
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		Platform:            string(platform),
		SocialAccountID:     "",
	}

	row, err := store.GetInstance().SocialMediaAccount_fetchAccessToken(context.Background(), args)
	if err != nil {
		plogger.Error("Error fetching access token!", err)
		return ""
	}

	plogger.Info("FetchSocialMediaAccessToken success", platform)
	return row.AccessToken
}
