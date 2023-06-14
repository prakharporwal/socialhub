package userpolicy

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestPolicy(t *testing.T) {
	t.Run("Policy combine to single string", func(t *testing.T) {
		permissionList := []Permission{
			CreatePostDraft,
			PostTweet,
		}

		s := PolicyNameList(permissionList)

		//for _, test :=  range tests{
		require.Equal(t, s, "create_post_draft, post_tweet")

		//}
	})
}
