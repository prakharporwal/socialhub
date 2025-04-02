package actiontype

type ActionType string

const (
	NAVIGATION ActionType = "NAVIGATION"
	DOWNLOAD   ActionType = "DOWNLOAD"
	ERROR      ActionType = "ERROR"
	REFRESH    ActionType = "REFRESH"
)
