package oauth2

import (
	"net/http"
	"net/url"
	"socialhub-server/model/datamodels/enums"
	"socialhub-server/pkg/plogger"
	"socialhub-server/pkg/utils"

	"github.com/gin-gonic/gin"
)

func OAuth2Initiate(ctx *gin.Context) {
	provider, ok := ctx.Params.Get("provider")
	if !ok {
		plogger.Error("Provider param not valid", provider)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "bad request: invalid provider key"})
		return
	}

	platform, ok := enums.ParseSocialMediaPlatforms(provider)
	if !ok {
		plogger.Error("No valid OAuth2 Provider configured for:", provider)
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "error: provider not found"})
		return
	}
	// get app config
	config := OAuth2AppConfig[platform]

	// generate query params
	dataParams := url.Values{}
	for key, value := range config {
		if value != "" {
			dataParams.Add(key, value)
		}
	}

	state := utils.GenerateRandomString(32)
	dataParams.Add("state", state)

	redirectURL := config["oauth2_authorize_url"] + "?" + dataParams.Encode()
	ctx.JSON(http.StatusOK, gin.H{"redirect_url": redirectURL})
}
