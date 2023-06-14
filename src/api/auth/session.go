package auth

import (
	"context"
	"errors"
	"github.com/gin-gonic/gin"
	"net/http"
	db "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

const SessionTokenAgeInMinutes = 1200 //twenty hours

func CreateSession(email string, currentOrgId string, userAgent string, clientIP string) (*db.Session, error) {
	tokenMaker, err := NewPasetoMaker()
	if err != nil {
		plogger.Error("Paseto Maker Failed ! ", err)
		return nil, errors.New("paseto Maker Failed ")
	}

	token, err := tokenMaker.CreateToken(email, currentOrgId, TokenAgeInSeconds*time.Second)
	if err != nil {
		plogger.Error("Token Creation Failed ! ", err)
		return nil, errors.New("paseto Maker Failed ")
	}

	args := db.CreateSessionParams{
		Email:        email,
		ClientIp:     clientIP,
		UserAgent:    userAgent,
		RefreshToken: token,
		ExpiresAt:    time.Now().Add(SessionTokenAgeInMinutes * time.Minute),
	}
	// create session in DB
	session, _ := store.GetInstance().CreateSession(context.Background(), args)

	return &session, nil
}

type refreshRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

func RefreshSession(ctx *gin.Context) {
	var request refreshRequest
	err := ctx.ShouldBindJSON(&request)
	useremail := GetCurrentUser()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, apierror.InvalidRequestBody)
		return
	}

	// generate a new pair of tokens and return
	response := generateLoginSession(useremail, currentOrganisationId, ctx.Request.UserAgent(), ctx.ClientIP())

	ctx.JSON(http.StatusOK, response)
}
