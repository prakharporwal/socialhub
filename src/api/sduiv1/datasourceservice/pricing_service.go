package datasourceservice

import (
	"context"
	"time"
)

type PricingDataStrategy struct {
}

func (p *PricingDataStrategy) GetService(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {

	time.Sleep(3 * time.Second)

	chResponse <- map[string]interface{}{
		"mrp":         7800,
		"discount":    7800 - 6400.51,
		"currency":    "Rs",
		"final_price": 6400.51,
	}
}

func (p *PricingDataStrategy) FetchData() {

}
