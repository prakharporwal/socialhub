package stringerror

import "errors"

var (
	FailedToParseJson = errors.New("failed to parse given string as json")
)
