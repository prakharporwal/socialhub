package postingservice

type InstagramPlatformPostingService struct {
}

func (ps *InstagramPlatformPostingService) CreatePost(postContent ContentModel) (string, error) {
	return "id", nil
}

func (ps *InstagramPlatformPostingService) UpdatePost(postId string, postContent ContentModel) error {
	return nil
}

func (ps *InstagramPlatformPostingService) DeletePost(postId string) error {
	return nil
}
