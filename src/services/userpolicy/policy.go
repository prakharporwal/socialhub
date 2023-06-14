package userpolicy

type PermissionNumber int

type Permission struct {
	Name   string
	Number PermissionNumber
}

var (
	CreatePostDraft     = Permission{Name: "create_post_draft", Number: CreatePostDraftNum} //can create a draft
	PostTweet           = Permission{Name: "post_tweet", Number: PostTweetNum}
	PostOnLinkedin      = Permission{Name: "post_on_linkedin", Number: PostOnLinkedinNum}
	AddNewSocialAccount = Permission{Name: "add_new_social_account", Number: AddNewSocialAccountNum}
	SchedulePost        = Permission{Name: "schedule_post", Number: SchedulePostNum}
)

const (
	CreatePostDraftNum PermissionNumber = iota + 1
	PostTweetNum
	PostOnLinkedinNum
	SchedulePostNum
	AddNewSocialAccountNum
)

var M = map[string]Permission{
	"post_tweet":        PostTweet,
	"create_post_draft": CreatePostDraft,
	"schedule_post":     SchedulePost,
	"post_on_linkedin":  PostOnLinkedin,
}

func GetPermissionFromName(name string) Permission {
	return M[name]
}

var (
	ADMIN     = []Permission{CreatePostDraft, PostTweet, PostOnLinkedin, AddNewSocialAccount, SchedulePost}
	MODERATOR = []Permission{CreatePostDraft, PostTweet, PostOnLinkedin, SchedulePost}
	CREATOR   = []Permission{CreatePostDraft}
)
