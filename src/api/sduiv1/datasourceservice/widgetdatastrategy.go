package datasourceservice

import (
	"context"
	"socialhub-server/api/sduiv1/datasourceservice/datasourcetype"
	"socialhub-server/pkg/plogger"
)

type IWidgetDataStrategy interface {
	FetchData(ctx context.Context, req map[string]interface{}, chResponse chan interface{})
}

func New(datasourceName string) IWidgetDataStrategy {
	strategy := DataSourceMapper(datasourcetype.DataSourceType(datasourceName))
	if strategy == nil {
		plogger.Warn("unsupported data source type: ", datasourceName)
		return &FallbackDataStrategy{}
	}
	return strategy
}
