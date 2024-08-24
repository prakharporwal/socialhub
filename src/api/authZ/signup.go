package authZ

import (
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
)

// create a user in DB
// set user to be inactive
// send user activation link email
// delete user if not activated on next 7 days

type signUpRequest struct {
	Username            string `json:"username" binding:"required"`
	UserEmail           string `json:"email" binding:"required,email"`
	OrganisationGroupId string `json:"organisation_group_id"`
	Password            string `json:"password" binding:"required,min=6"`
}

func SignUp(ctx *gin.Context) {
	var request signUpRequest

	err := ctx.ShouldBindJSON(&request)
	if err != nil {
		plogger.Error("parsing json data failed!", err)
		ctx.JSON(http.StatusInternalServerError, apierror.InvalidRequestBody)
		return
	}

	// TODO: validate username format not same as email
	// TODO: add email validation
	// TODO: validate password strength

	if len(request.Password) < 8 {
		plogger.Error("Password length less than 8 characters")
		ctx.JSON(http.StatusBadRequest, apierror.PasswordValidationFailed)
		return
	}

	passwordHash, err := bcrypt.GenerateFromPassword([]byte(request.Password), 15)
	if err != nil {
		plogger.Error("Failed encrypting password", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	args := db.CreateUserParams{
		UserEmail:           request.UserEmail,
		Username:            request.Username,
		OrganisationGroupID: PUBLIC, // hard code OrganisationGroupID to PUBLIC for everyone
		PasswordHash:        string(passwordHash),
		IsVerified:          false,
	}

	user, err := store.GetInstance().CreateUser(ctx, args)
	if err != nil {
		plogger.Error("db query for user creation failed", err)
		if pqErr, ok := err.(*pq.Error); ok {
			if pqErr.Code.Name() == "unique_violation" {
				plogger.Error("unique_key_violation ", "User with this email or username already exists!")
				ctx.JSON(http.StatusInternalServerError, gin.H{"message": "User with this email or username already exists!"})
				return
			}
			plogger.Error(err)
			ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		}
		return
	}

	ctx.JSON(http.StatusOK, user)
}
