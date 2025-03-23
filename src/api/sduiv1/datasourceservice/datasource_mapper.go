package datasourceservice

import (
	"socialhub-server/api/sduiv1/datasourceservice/datasourcetype"
	"socialhub-server/pkg/plogger"
)

func DataSourceMapper(datasourceName datasourcetype.DataSourceType) IWidgetDataStrategy {
	plogger.Debug("datasourceName: ", datasourceName)
	switch datasourceName {
	case datasourcetype.PRODUCT_DETAILS_SERVICE:
		return &ProductDetailsDataStrategy{}
	case datasourcetype.PRICING_SERVICE:
		return &PricingDataStrategy{}
	case datasourcetype.FULFILMENT_OPTION:
		return &FulfillmentOptionsDataStrategy{}
	case datasourcetype.SELLER_DETAILS_SERVICE:
		return &SellerDetailsDataStrategy{}
	}
	return nil
}
