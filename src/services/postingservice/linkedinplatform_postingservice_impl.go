package postingservice

import (
	"socialhub-server/model/datamodels"
	"socialhub-server/services/linkedinservice"
)

type LinkedinPlatformPostingService struct {
	AccessToken string
}

type TextContentModel struct {
	Text string
}

func NewLinkedinPlatformPostingService() *LinkedinPlatformPostingService {
	return &LinkedinPlatformPostingService{}
}

func (ps *LinkedinPlatformPostingService) CreatePost(postContent ContentModel) (string, error) {
	content := postContent.(TextContentModel)
	post := datamodels.LinkedInFeedPostContent{
		Commentary: content.Text,
		Visibility: "PUBLIC",
	}

	return linkedinservice.SendPostToLinkedin(post, ps.AccessToken)
}

func (ps *LinkedinPlatformPostingService) UpdatePost(postId string, postContent ContentModel) error {
	return nil
}

func (ps *LinkedinPlatformPostingService) DeletePost(postId string) error {
	return nil
}
