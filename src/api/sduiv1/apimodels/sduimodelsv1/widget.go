package sduimodelsv1

type Widget struct {
	WidgetID int         `json:"widget_id"`
	Data     interface{} `json:"data"`
	Type     string      `json:"type"`
	ViewType string      `json:"view_type,omitempty"`
}
