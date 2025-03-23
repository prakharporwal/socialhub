package sduimodelsv1

type Widget struct {
	Id       int         `json:"id"`
	Data     interface{} `json:"data"`
	Type     string      `json:"type"`
	ViewType string      `json:"view_type,omitempty"`
}
