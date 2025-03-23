package datasourceservice

import (
	"context"
	"fmt"
	"socialhub-server/api/sduiv1/apimodels/sduimodelsv1"
	"socialhub-server/api/sduiv1/apimodels/sduimodelsv1/actiontype"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

type SellerDetailsDataStrategy struct {
}

func (p *SellerDetailsDataStrategy) GetService(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {
	listingId := fmt.Sprintf("%v", req["listing_id"])
	seller, err := store.GetInstance().SellerService_fetchSellerDetailsForListing(ctx, listingId)

	plogger.Debug(seller)
	if err != nil {
		plogger.Error("Error while fetching seller details: ", err.Error())
		chResponse <- nil
		return
	}

	resp := sduimodelsv1.RenderableComponent{Action: sduimodelsv1.Action{Type: actiontype.NAVIGATION, Url: "https://www.google.com"}, Value: seller}

	chResponse <- resp
}

func (p *SellerDetailsDataStrategy) FetchData() {
}
