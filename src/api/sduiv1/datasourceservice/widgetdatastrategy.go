package datasourceservice

import (
	"context"
	"socialhub-server/api/sduiv1/datasourceservice/datasourcetype"
)

type IWidgetDataStrategy interface {
	GetService(ctx context.Context, req map[string]interface{}, chResponse chan interface{})
	FetchData()
}

func New(datasourceName string) IWidgetDataStrategy {
	return DataSourceMapper(datasourcetype.DataSourceType(datasourceName))
}
