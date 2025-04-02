package datasourceservice

import (
	"context"
	"fmt"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

type ProductDetailsDataStrategy struct {
}

func (p *ProductDetailsDataStrategy) FetchData(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {

	plogger.Info("GetService: ProductDetailsDataStrategy")
	// Type assert and extract values with proper error handling
	listingIdVal, listingOk := req["listing_id"]
	productIdVal, productOk := req["product_id"]

	if !listingOk || !productOk {
		plogger.Error("Error in ProductDetailsDataStrategy: ", "missing required parameters: listing_id or product_id")
		chResponse <- nil
		return
	}

	listingId := fmt.Sprintf("%v", listingIdVal)
	productId := fmt.Sprintf("%v", productIdVal)

	plogger.Info("GetService: ProductDetailsDataStrategy ", listingId, productId)

	queryArgs := db.ProductService_fetchProductListingDetailsForProductPageParams{ProductID: productId, ListingID: listingId}
	product, err := store.GetInstance().ProductService_fetchProductListingDetailsForProductPage(ctx, queryArgs)
	if err != nil {
		plogger.Error("Error while fetching product details from product service ", err.Error())
		chResponse <- nil
		return
	}
	chResponse <- product
}
