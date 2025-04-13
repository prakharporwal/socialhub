package postingservice

type YoutubePlatformPostingService struct {
}

func (ps *YoutubePlatformPostingService) CreatePost(postContent ContentModel) (string, error) {
	return "id", nil
}

func (ps *YoutubePlatformPostingService) UpdatePost(postId string, postContent ContentModel) error {
	return nil
}

func (ps *YoutubePlatformPostingService) DeletePost(postId string) error {
	return nil
}
