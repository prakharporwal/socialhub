package datasourceservice

type ProductDetailsDataStrategy struct {
}

func New() IWidgetDataStrategy {
	return &ProductDetailsDataStrategy{}
}

func (p *ProductDetailsDataStrategy) GetService(req map[string]interface{}) interface{} {
	listingId := req["listing_id"]
	productId := req["product_id"]

	return map[string]interface{}{
		"product_name": "Book",
		"brand":        "Wholesome!",
		"listing_id":   listingId,
		"product_id":   productId,
	}
}

func (p *ProductDetailsDataStrategy) FetchData() {

}
