package models

import "socialhub-server/model/models/linkedin"

type LinkedInFeedPostContent struct {
	Author                    string                     `json:"author"`
	Commentary                string                     `json:"commentary"`
	Visibility                linkedin.ContentVisibility `json:"visibility"`
	Distribution              ContentDistribution        `json:"distribution"`
	LifecycleState            string                     `json:"lifecycleState"`
	IsReshareDisabledByAuthor bool                       `json:"isReshareDisabledByAuthor"`
}

type LinkedInFeedPostContentPoll struct {
	LinkedInFeedPostContent
	Content PostContent `json:"content"`
}

type ContentDistribution struct {
	FeedDistribution               string        `json:"feedDistribution"`
	TargetEntities                 []interface{} `json:"targetEntities"`
	ThirdPartyDistributionChannels []interface{} `json:"thirdPartyDistributionChannels"`
}

type PostContent struct {
	Poll PollInfo `json:"poll"`
}

type PollInfo struct {
	Question string        `json:"question"`
	Options  []PollOptions `json:"options"`
	Settings PollSettings  `json:"settings"`
}

type PollOptions struct {
	Text string `json:"text"`
}

type PollSettings struct {
	Duration string `json:"duration"`
}
