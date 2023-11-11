package password

import (
	"context"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"socialhub-server/env"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/encrypt"
	"socialhub-server/pkg/plogger"
)

type reqBody struct {
	UserEmail      string `json:"user_email"`
	OrganisationId string `json:"organisation_id"`
}

func ForgotPasswordRequest(ctx *gin.Context) {
	var reqObj reqBody
	err := ctx.ShouldBindJSON(&reqObj)
	if err != nil {
		plogger.Error(apierror.InvalidRequestBody)
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
	}
	token := encrypt.GenerateRandomToken(64)
	plogger.Debug(token)

	args := sqlcmodels.UserPasswordResetTokens_insertParams{
		OrganisationGroupID: reqObj.OrganisationId,
		UserID:              reqObj.UserEmail,
		Token:               token,
		RequestedByClientIp: ctx.ClientIP(),
	}

	//store in db
	row, err := store.GetInstance().UserPasswordResetTokens_insert(context.Background(), args)
	if err != nil {
		plogger.Error("Failed to store token in db !", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
	}

	plogger.Debug(row.OrganisationGroupID, row.UserID)

	resetLink := env.WebsiteURL + "/forgot-password-reset" + "?token=" + token

	plogger.Info(resetLink)
	ctx.JSON(http.StatusOK, gin.H{"message": "sent reset link to you email!"})
}

type resetBody struct {
	NewPassword string `json:"new_password" binding:"required"`
	Token       string `json:"token" binding:"required"`
}

func ForgotPasswordReset(ctx *gin.Context) {
	var reqObj resetBody
	err := ctx.ShouldBindJSON(&reqObj)
	if err != nil {
		plogger.Error(apierror.InvalidRequestBody)
		ctx.JSON(http.StatusBadRequest, apierror.InvalidRequestBody)
		return
	}

	// validate new password with password policy
	if len(reqObj.NewPassword) < 8 {
		plogger.Error("Password length less than 8 characters")
		ctx.JSON(http.StatusBadRequest, apierror.PasswordValidationFailed)
		return
	}

	// get user and org from db and update the password table accordingly
	row, err := store.GetInstance().UserPasswordResetTokens_findUserIdByToken(context.Background(), reqObj.Token)
	if err != nil {
		plogger.Error("Failed to get user from db !", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	if row.IsExpired == true {
		plogger.Error("User password reset token expired ! ", err)
		ctx.JSON(http.StatusForbidden, apierror.PasswordResetTokenUsedorExpired)
		return
	}

	plogger.Debug(row.OrganisationGroupID, row.UserID)

	// create password hash
	passwordHash, err := bcrypt.GenerateFromPassword([]byte(reqObj.NewPassword), 15)
	if err != nil {
		plogger.Error("Failed encrypting password", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	// update password in db
	args := sqlcmodels.Users_updatePasswordParams{
		UserEmail:           row.UserID,
		OrganisationGroupID: row.OrganisationGroupID,
		PasswordHash:        string(passwordHash),
	}

	userRow, err := store.GetInstance().Users_updatePassword(context.Background(), args)
	if err != nil {
		plogger.Error("Failed inserting user row in database!", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	plogger.Debug(userRow.UserEmail, userRow.OrganisationGroupID)

	err = store.GetInstance().UserPasswordResetTokens_delete(context.Background(), reqObj.Token)
	if err != nil {
		plogger.Error("Failed to get user from db !", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "Password Changed!"})
}
