package datasourceservice

import (
	"context"
	"fmt"
	"socialhub-server/api/sduiv1/apimodels/sduimodelsv1"
	"socialhub-server/api/sduiv1/apimodels/sduimodelsv1/actiontype"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
	"strconv"
)

type SellerDetailsDataStrategy struct {
}

func (p *SellerDetailsDataStrategy) FetchData(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {
	listingIdVal, listingOk := req["listing_id"]
	if !listingOk {
		plogger.Error("Error in SellerDetailsDataStrategy: ", "missing required parameters: listing_id")
		chResponse <- nil
		return
	}

	listingId := fmt.Sprintf("%v", listingIdVal)
	seller, err := store.GetInstance().SellerService_fetchSellerDetailsForListing(ctx, listingId)

	plogger.Debug(seller)
	if err != nil {
		plogger.Error("Error while fetching seller details: ", err.Error())
		chResponse <- nil
		return
	}

	// TODO: replace with actual data
	resp := sduimodelsv1.RenderableComponent{Action: sduimodelsv1.Action{Type: actiontype.NAVIGATION, Url: "/seller/" + strconv.FormatInt(seller.SellerID, 10)}, Value: seller}

	chResponse <- resp
}
