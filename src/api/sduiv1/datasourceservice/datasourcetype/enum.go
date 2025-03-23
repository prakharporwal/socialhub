package datasourcetype

type DataSourceType string

const (
	PRICING_SERVICE         DataSourceType = "PRICING_SERVICE"
	PRODUCT_DETAILS_SERVICE DataSourceType = "PRODUCT_DETAILS_SERVICE"
	FULFILMENT_OPTION       DataSourceType = "FULFILMENT_OPTION"
	SELLER_DETAILS_SERVICE  DataSourceType = "SELLER_DETAILS_SERVICE"
)
