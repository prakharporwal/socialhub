package auth

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

func ResetPassword(ctx *gin.Context) {
	var request struct {
		Password string `json:"password"`
	}

	ctx.ShouldBindJSON(&request)

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(request.Password), 15)
	if err != nil {
		plogger.Error("Failed encrypting password", err)
		return
	}

	args := sqlcmodels.ResetUserPasswordParams{
		UserEmail:           "prateek@gmail.com",
		OrganisationGroupID: "org_yogveda",
		PasswordHash:        string(passwordHash),
	}

	row, err := store.GetInstance().ResetUserPassword(ctx, args)
	if err != nil {
		plogger.Error(err)
	}

	plogger.Info(row.UserEmail, row.OrganisationGroupID)

	ctx.JSON(http.StatusOK, row)
}
