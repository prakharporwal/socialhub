package landingpage

import (
	"net/http"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/apimodels"
	"socialhub-server/pkg/plogger"

	"github.com/gin-gonic/gin"
)

func SubmitForEarlyAccess(ctx *gin.Context) {
	var obj apimodels.EarlyAccessFormRequest
	ctx.ShouldBindJSON(&obj)
	plogger.Info("User signup for early access", obj.Email)

	// Add email to the database for early access feature
	mail, err := store.GetInstance().BiboComic_LandingPage_SaveUserForEarlyAccess(ctx, obj.Email)
	if err != nil {
		plogger.Error("Error storing to table", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	ctx.JSON(200, gin.H{"message": mail + " registered for early access"})
}
