package datasourceservice

import (
	"context"
	"socialhub-server/api/sduiv1/apimodels/sduimodelsv1"
	"time"
)

type FulfillmentOptionsDataStrategy struct {
}

type OptionStatusActiveType string

const (
	OptionStatusActive   OptionStatusActiveType = "ACTIVE"
	OptionStatusInActive OptionStatusActiveType = "INACTIVE"
)

type FulfillmentButtonUIValueModel struct {
	Title           string                 `json:"title"`
	IconUrl         string                 `json:"icon_url"`
	BackgroundColor string                 `json:"background_color"`
	BorderColor     string                 `json:"border_color"`
	Status          OptionStatusActiveType `json:"status"`
	IsSelected      bool                   `json:"is_selected"`
}

func (p *FulfillmentOptionsDataStrategy) GetService(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {

	time.Sleep(2 * time.Second)

	chResponse <- []sduimodelsv1.RenderableComponent{
		{Value: FulfillmentButtonUIValueModel{Status: OptionStatusActive, Title: "Delivery", IconUrl: "https://dummy.djsfnfdl.co.xyz", BackgroundColor: "#ffffff", BorderColor: "#000000", IsSelected: true}},
		{Value: FulfillmentButtonUIValueModel{Status: OptionStatusActive, Title: "Pickup", IconUrl: "https://dummy.djsfnfdl.co.xyz", BackgroundColor: "#ffffff", BorderColor: "#000000", IsSelected: false}},
	}
}

func (p *FulfillmentOptionsDataStrategy) FetchData() {

}
