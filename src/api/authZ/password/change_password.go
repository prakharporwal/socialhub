package password

import (
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"socialhub-server/api/authZ"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

func ChangePassword(ctx *gin.Context) {
	var request struct {
		Password string `json:"password"`
	}

	ctx.ShouldBindJSON(&request)

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(request.Password), 15)
	if err != nil {
		plogger.Error("Failed encrypting password", err)
		return
	}

	args := sqlcmodels.Users_updatePasswordParams{
		UserEmail:           authZ.GetCurrentUser(),
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		PasswordHash:        string(passwordHash),
	}

	row, err := store.GetInstance().Users_updatePassword(ctx, args)
	if err != nil {
		plogger.Error(err)
	}

	plogger.Info(row.UserEmail, row.OrganisationGroupID)

	ctx.JSON(http.StatusOK, row)
}
