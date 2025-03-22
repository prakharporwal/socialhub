package apimodels

type FetchResponse struct {
	RequestId string       `json:"requestId"`
	Request   interface{}  `json:"request"`
	Response  PageResponse `json:"response"`
	Session   interface{}  `json:"Session"`
}

type PageResponse struct {
	PageData interface{}              `json:"pageData"`
	PageMeta string                   `json:"pageMeta"`
	Slots    []map[string]interface{} `json:"slots"`
}
