package apimodels

import "socialhub-server/api/sduiv1/apimodels/sduimodelsv1"

type FetchResponse struct {
	RequestId string       `json:"requestId"`
	Request   interface{}  `json:"request"`
	Response  PageResponse `json:"response"`
	Session   interface{}  `json:"session"`
}

type PageResponse struct {
	PageData interface{}           `json:"pageData"`
	PageMeta interface{}           `json:"pageMeta"`
	Slots    []sduimodelsv1.Widget `json:"slots"`
}
