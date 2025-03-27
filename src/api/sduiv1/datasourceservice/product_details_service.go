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

func (p *ProductDetailsDataStrategy) GetService(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {

	plogger.Info("GetService: ProductDetailsDataStrategy")
	listingId := fmt.Sprintf("%v", req["listing_id"])
	productId := fmt.Sprintf("%v", req["product_id"])

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

func (p *ProductDetailsDataStrategy) FetchData() {

}
