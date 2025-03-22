package sduiv1

import (
	"encoding/json"
	"net/http"
	"net/url"
	"socialhub-server/api/sduiv1/apimodels"
	"socialhub-server/api/sduiv1/datasourceservice"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

type pageFetchV4Request struct {
	PageUri string `json:"page_uri" binding:"required"`
}

func PageFetchV4(ctx *gin.Context) {
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

	// fetch datasource se data
	datasource := row.DatasourceService
	plogger.Info(datasource)

	dataStrategy := datasourceservice.New()

	// prepare data to query details from service
	pageUrl, err := url.Parse("https://dummy.djsfnfdl.co.xyz" + reqBody.PageUri)
	if err != nil {
		plogger.Error("Cannot parse request uri", err.Error())
	}

	productId := pageUrl.Query().Get("pid")
	listingId := pageUrl.Query().Get("lid")
	data := dataStrategy.GetService(map[string]interface{}{"listing_id": listingId, "product_id": productId})

	// Session Data:
	val, ok := ctx.Get("current_user")

	resp := apimodels.FetchResponse{Response: apimodels.PageResponse{Slots: configMap, PageData: data}, RequestId: ctx.GetHeader("X-Request-ID"), Request: reqBody, Session: gin.H{"email": val, "logged_in": ok}}
	ctx.JSON(200, resp)
}
