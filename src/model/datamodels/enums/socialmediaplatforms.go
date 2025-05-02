package enums

type SocialMediaPlatforms string

const (
	TWITTER   SocialMediaPlatforms = "twitter"
	LINKEDIN  SocialMediaPlatforms = "linkedin"
	INSTAGRAM SocialMediaPlatforms = "instagram"
	YOUTUBE   SocialMediaPlatforms = "youtube"
	FACEBOOK  SocialMediaPlatforms = "facebook"
)

func ParseSocialMediaPlatforms(key string) (SocialMediaPlatforms, bool) {
	m := map[string]SocialMediaPlatforms{
		"twitter":   TWITTER,
		"linkedin":  LINKEDIN,
		"instagram": INSTAGRAM,
		"youtube":   YOUTUBE,
		"facebook":  FACEBOOK,
	}
	if _, ok := m[key]; !ok {
		return "", false
	}
	return m[key], true
}
