package sduiv1

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"socialhub-server/api/sduiv1/apimodels"
	"socialhub-server/api/sduiv1/apimodels/sduimodelsv1"
	"socialhub-server/api/sduiv1/datasourceservice"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"sort"
	"sync"

	"github.com/gin-gonic/gin"
)

type pageFetchV4Request struct {
	PageUri    string `json:"page_uri" binding:"required"`
	PageNumber int    `json:"page_num,omitempty"`
}

func PageFetchV4(ctx *gin.Context) {
	plogger.Info("---------PageFetchV4-------------")
	var reqBody pageFetchV4Request

	err := ctx.ShouldBindJSON(&reqBody)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	row, err := store.GetInstance().PageService_getPageLayoutConfig(ctx, 1)
	config := row.Config
	if err != nil {
		plogger.Error("Error querying config!", err.Error())
		ctx.JSON(500, apierror.UnexpectedError)
		return
	}

	var configMap []map[string]interface{}
	err = json.Unmarshal([]byte(config), &configMap)
	if err != nil {
		plogger.Error("Error unmarshaling json config!", err.Error())
		ctx.JSON(500, apierror.UnexpectedError)
		return
	}

	pageUrl, err := url.Parse("https://dummy.djsfnfdl.co.xyz" + reqBody.PageUri)
	if err != nil {
		plogger.Error("Cannot parse request uri", err.Error())
	}

	productId := pageUrl.Query().Get("pid")
	listingId := pageUrl.Query().Get("lid")

	plogger.Info("Fetching data for page: "+reqBody.PageUri, len(configMap))

	var slots []sduimodelsv1.Widget
	var wg sync.WaitGroup

	for key, value := range configMap {
		ch := make(chan interface{}, 10)
		defer close(ch)
		wg.Add(1)

		go func() {
			defer wg.Done()

			widgetType := fmt.Sprintf("%v", value["type"])
			datasource := fmt.Sprintf("%v", value["datasource"])

			// optional field
			var viewType string
			if value["view_type"] != nil {
				viewType = fmt.Sprintf("%v", value["view_type"])
			}

			// fetch datasource se data
			dataStrategy := datasourceservice.New(datasource)
			var data interface{}

			plogger.Debug("Data fetched for widget type: ", dataStrategy)

			if dataStrategy != nil {
				// prepare data to query details from service
				dataStrategy.GetService(ctx, map[string]interface{}{"listing_id": listingId, "product_id": productId}, ch)
				data = <-ch
			} else {
				data = nil
			}

			slot := &sduimodelsv1.Widget{Id: key}
			slot.Data = data
			slot.Type = widgetType
			if viewType != "" {
				slot.ViewType = viewType
			}

			slots = append(slots, *slot)
		}()
	}
	wg.Wait()

	pageData := map[string]interface{}{
		"pagename": "product_page",
		"pagetype": "pp",
	}

	// Sort slots by widget id
	// for consistent response order
	sort.Slice(slots, func(i, j int) bool {
		return slots[i].Id < slots[j].Id
	})

	// Session Data:
	val, ok := ctx.Get("current_user")
	resp := apimodels.FetchResponse{Response: apimodels.PageResponse{Slots: slots, PageData: pageData}, RequestId: ctx.GetHeader("X-Request-ID"), Request: reqBody, Session: gin.H{"email": val, "logged_in": ok}}
	ctx.JSON(200, resp)
}
