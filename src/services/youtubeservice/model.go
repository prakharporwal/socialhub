package youtubeservice

import "time"

// Video represents the structure of a YouTube video as per the provided JSON.
type Video struct {
	Kind                 string                  `json:"kind"`
	Etag                 string                  `json:"etag"`
	ID                   string                  `json:"id"`
	Snippet              Snippet                 `json:"snippet"`
	ContentDetails       ContentDetails          `json:"contentDetails"`
	Status               Status                  `json:"status"`
	Statistics           Statistics              `json:"statistics"`
	PaidProductPlacement PaidProductPlacement    `json:"paidProductPlacementDetails"`
	Player               Player                  `json:"player"`
	TopicDetails         TopicDetails            `json:"topicDetails"`
	RecordingDetails     RecordingDetails        `json:"recordingDetails"`
	FileDetails          FileDetails             `json:"fileDetails"`
	ProcessingDetails    ProcessingDetails       `json:"processingDetails"`
	Suggestions          Suggestions             `json:"suggestions"`
	LiveStreamingDetails LiveStreamingDetails    `json:"liveStreamingDetails"`
	Localizations        map[string]Localization `json:"localizations"`
}

// Snippet contains video metadata information.
type Snippet struct {
	PublishedAt          time.Time            `json:"publishedAt"`
	ChannelId            string               `json:"channelId"`
	Title                string               `json:"title"`
	Description          string               `json:"description"`
	Thumbnails           map[string]Thumbnail `json:"thumbnails"`
	ChannelTitle         string               `json:"channelTitle"`
	Tags                 []string             `json:"tags"`
	CategoryId           string               `json:"categoryId"`
	LiveBroadcastContent string               `json:"liveBroadcastContent"`
	DefaultLanguage      string               `json:"defaultLanguage"`
	Localized            Localized            `json:"localized"`
	DefaultAudioLanguage string               `json:"defaultAudioLanguage"`
}

// Thumbnail contains information about the thumbnail of a video.
type Thumbnail struct {
	URL    string `json:"url"`
	Width  uint   `json:"width"`
	Height uint   `json:"height"`
}

// Localized contains localized title and description.
type Localized struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

// ContentDetails contains details about video content.
type ContentDetails struct {
	Duration           string            `json:"duration"`
	Dimension          string            `json:"dimension"`
	Definition         string            `json:"definition"`
	Caption            string            `json:"caption"`
	LicensedContent    bool              `json:"licensedContent"`
	RegionRestriction  RegionRestriction `json:"regionRestriction"`
	ContentRating      ContentRating     `json:"contentRating"`
	Projection         string            `json:"projection"`
	HasCustomThumbnail bool              `json:"hasCustomThumbnail"`
}

// RegionRestriction contains information about allowed and blocked regions.
type RegionRestriction struct {
	Allowed []string `json:"allowed"`
	Blocked []string `json:"blocked"`
}

// ContentRating contains various content rating systems.
type ContentRating struct {
	AcbRating    string `json:"acbRating"`
	AgcomRating  string `json:"agcomRating"`
	AnatelRating string `json:"anatelRating"`
	// Add all other rating systems here...
	DjctqRatingReasons []string `json:"djctqRatingReasons"`
	FpbRatingReasons   []string `json:"fpbRatingReasons"`
}

// Status contains the status of the video.
type Status struct {
	UploadStatus            string    `json:"uploadStatus"`
	FailureReason           string    `json:"failureReason"`
	RejectionReason         string    `json:"rejectionReason"`
	PrivacyStatus           string    `json:"privacyStatus"`
	PublishAt               time.Time `json:"publishAt"`
	License                 string    `json:"license"`
	Embeddable              bool      `json:"embeddable"`
	PublicStatsViewable     bool      `json:"publicStatsViewable"`
	MadeForKids             bool      `json:"madeForKids"`
	SelfDeclaredMadeForKids bool      `json:"selfDeclaredMadeForKids"`
}

// Statistics contains the video statistics.
type Statistics struct {
	ViewCount     string `json:"viewCount"`
	LikeCount     string `json:"likeCount"`
	DislikeCount  string `json:"dislikeCount"`
	FavoriteCount string `json:"favoriteCount"`
	CommentCount  string `json:"commentCount"`
}

// PaidProductPlacement contains paid product placement details.
type PaidProductPlacement struct {
	HasPaidProductPlacement bool `json:"hasPaidProductPlacement"`
}

// Player contains the player information for embedding the video.
type Player struct {
	EmbedHtml   string `json:"embedHtml"`
	EmbedHeight int64  `json:"embedHeight"`
	EmbedWidth  int64  `json:"embedWidth"`
}

// TopicDetails contains the topic details for the video.
type TopicDetails struct {
	TopicIds         []string `json:"topicIds"`
	RelevantTopicIds []string `json:"relevantTopicIds"`
	TopicCategories  []string `json:"topicCategories"`
}

// RecordingDetails contains the recording details for the video.
type RecordingDetails struct {
	RecordingDate time.Time `json:"recordingDate"`
}

// FileDetails contains details about the uploaded file.
type FileDetails struct {
	FileName     string        `json:"fileName"`
	FileSize     uint64        `json:"fileSize"`
	FileType     string        `json:"fileType"`
	Container    string        `json:"container"`
	VideoStreams []VideoStream `json:"videoStreams"`
	AudioStreams []AudioStream `json:"audioStreams"`
	DurationMs   uint64        `json:"durationMs"`
	BitrateBps   uint64        `json:"bitrateBps"`
	CreationTime string        `json:"creationTime"`
}

// VideoStream contains details about the video stream.
type VideoStream struct {
	WidthPixels  uint    `json:"widthPixels"`
	HeightPixels uint    `json:"heightPixels"`
	FrameRateFps float64 `json:"frameRateFps"`
	AspectRatio  float64 `json:"aspectRatio"`
	Codec        string  `json:"codec"`
	BitrateBps   uint64  `json:"bitrateBps"`
	Rotation     string  `json:"rotation"`
	Vendor       string  `json:"vendor"`
}

// AudioStream contains details about the audio stream.
type AudioStream struct {
	ChannelCount uint   `json:"channelCount"`
	Codec        string `json:"codec"`
	BitrateBps   uint64 `json:"bitrateBps"`
	Vendor       string `json:"vendor"`
}

// ProcessingDetails contains details about the video processing.
type ProcessingDetails struct {
	ProcessingStatus              string             `json:"processingStatus"`
	ProcessingProgress            ProcessingProgress `json:"processingProgress"`
	ProcessingFailureReason       string             `json:"processingFailureReason"`
	FileDetailsAvailability       string             `json:"fileDetailsAvailability"`
	ProcessingIssuesAvailability  string             `json:"processingIssuesAvailability"`
	TagSuggestionsAvailability    string             `json:"tagSuggestionsAvailability"`
	EditorSuggestionsAvailability string             `json:"editorSuggestionsAvailability"`
	ThumbnailsAvailability        string             `json:"thumbnailsAvailability"`
}

// ProcessingProgress contains progress details during video processing.
type ProcessingProgress struct {
	PartsTotal     uint64 `json:"partsTotal"`
	PartsProcessed uint64 `json:"partsProcessed"`
	TimeLeftMs     uint64 `json:"timeLeftMs"`
}

// Suggestions contains suggestions related to video processing.
type Suggestions struct {
	ProcessingErrors   []string        `json:"processingErrors"`
	ProcessingWarnings []string        `json:"processingWarnings"`
	ProcessingHints    []string        `json:"processingHints"`
	TagSuggestions     []TagSuggestion `json:"tagSuggestions"`
	EditorSuggestions  []string        `json:"editorSuggestions"`
}

// TagSuggestion contains tag suggestion details.
type TagSuggestion struct {
	Tag               string   `json:"tag"`
	CategoryRestricts []string `json:"categoryRestricts"`
}

// LiveStreamingDetails contains live stream-related details for the video.
type LiveStreamingDetails struct {
	ActualStartTime    time.Time `json:"actualStartTime"`
	ActualEndTime      time.Time `json:"actualEndTime"`
	ScheduledStartTime time.Time `json:"scheduledStartTime"`
	ScheduledEndTime   time.Time `json:"scheduledEndTime"`
	ConcurrentViewers  uint64    `json:"concurrentViewers"`
	ActiveLiveChatId   string    `json:"activeLiveChatId"`
}

// Localization represents the localization details for the video.
type Localization struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}
