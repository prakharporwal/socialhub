package datasourceservice

type IWidgetDataStrategy interface {
	GetService(req map[string]interface{}) interface{}
	FetchData()
}
