package postingservice

type ContentModel interface{}

type SocialMediaPlatformPostingService interface {
	CreatePost(postContent ContentModel) (string, error)
	DeletePost(postId string) error
	UpdatePost(postId string, postContent ContentModel) error
}
