package auth

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

const TokenAgeInSeconds = 5 * 60 * 60

type loginRequest struct {
	UserId   string `json:"user_id" binding:"required,email"` // userId can be username or userEmail
	Password string `json:"password" binding:"required"`
}

type loginResponse struct {
	AccessToken  string    `json:"access_token"` // userId can be username or userEmail
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
}

func Login(ctx *gin.Context) {
	var request loginRequest
	err := ctx.ShouldBindJSON(&request)
	if err != nil {
		log.Println("Error Parsing! Invalid format", err)
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Incorrect format for Request Body user_id and password is required!"})
		return
	}
	plogger.Debug(request.UserId, " is attempting login!")

	// convert provided password and username to hash with salt
	// check for the hash string match or not
	user, err := store.GetInstance().GetUserDetails(ctx, request.UserId)
	if err != nil && err == sql.ErrNoRows {
		plogger.Error("User doesn't exist!", err)
		ctx.JSON(http.StatusUnauthorized, gin.H{apierror.MESSAGE: "Incorrect user or password"})
		return
	}
	plogger.Debug(user.UserEmail, " ", user.Username, " is retrieve from db!")

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(request.Password))
	if err != nil {
		plogger.Error("Password Not matched!", err)
		ctx.JSON(http.StatusUnauthorized, gin.H{apierror.MESSAGE: "Incorrect user or password"})
		return
	}

	// respond with a paseto / jwt for further login
	response := generateLoginSession(user.UserEmail, ctx.Request.UserAgent(), ctx.ClientIP())

	plogger.Debug(request.UserId, " is logged in successfully!")

	// not working IDK why
	ctx.SetCookie("AccessToken", response.AccessToken, TokenAgeInSeconds, "/", "yogveda.live", false, false)

	ctx.JSON(http.StatusOK, response)
}

var currentUser string

func SetCurrentUser(username string) {
	currentUser = username
}

func GetCurrentUser() string {
	return currentUser
}

func generateLoginSession(useremail string, useragent string, clientip string) *loginResponse {
	//var auth services.Auth
	tokenMaker, err := NewPasetoMaker()
	if err != nil {
		plogger.Error("Paseto Maker Failed ! ", err)
		return nil
	}
	token, err := tokenMaker.CreateToken(useremail, TokenAgeInSeconds*time.Second)
	if err != nil {
		plogger.Error("Token Creation Failed ! ", err)
		return nil
	}

	session, err := CreateSession(useremail, useragent, clientip)

	return &loginResponse{
		AccessToken:  token,
		RefreshToken: session.RefreshToken,
		ExpiresAt:    session.ExpiresAt,
	}
}
