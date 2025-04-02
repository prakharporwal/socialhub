package sduimodelsv1

type RenderableComponent struct {
	Action Action      `json:"action,omitempty"`
	Value  interface{} `json:"value,omitempty"`
}
