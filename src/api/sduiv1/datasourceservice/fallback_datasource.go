package datasourceservice

import (
	"context"
)

type FallbackDataStrategy struct {
}

func (p *FallbackDataStrategy) FetchData(ctx context.Context, req map[string]interface{}, chResponse chan interface{}) {
	chResponse <- nil
}
