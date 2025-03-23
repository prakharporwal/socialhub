package sduimodelsv1

import "socialhub-server/api/sduiv1/apimodels/sduimodelsv1/actiontype"

type Action struct {
	Params map[string]string     `json:"params,omitempty"`
	Type   actiontype.ActionType `json:"type,omitempty"`
	Url    string                `json:"url,omitempty"`
}
