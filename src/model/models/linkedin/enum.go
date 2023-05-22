package linkedin

type ContentVisibility string

const (
	PUBLIC      ContentVisibility = "PUBLIC"
	CONNECTIONS                   = "CONNECTIONS"
	LOGGED_IN                     = "LOGGED_IN"
	CONTAINER                     = "CONTAINER"
)

type LinkedinContentType string

func (l LinkedinContentType) String() string {
	return string(l)
}

const (
	TEXT LinkedinContentType = "text"
	POLL                     = "poll"
)
