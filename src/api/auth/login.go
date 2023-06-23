package auth

import (
	"database/sql"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"log"
	"net/http"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
	"time"
)

const fiveHours = 5 * 60 * 60
const TokenAgeInSeconds = fiveHours

type loginRequest struct {
	UserId              string `json:"user_id" binding:"required,email"` // userId can be username or userEmail
	OrganisationGroupId string `json:"organisation_group_id" binding:"required"`
	Password            string `json:"password" binding:"required"`
}

type loginResponse struct {
	Username            string `json:"username"`
	OrganisationGroupId string `json:"organisation_group_id"`
	AccessToken         string `json:"access_token"` // userId can be username or userEmail
	RefreshToken        string `json:"refresh_token"`
	ExpiresAt           string `json:"expires_at"`
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
	args := sqlcmodels.GetUserDetailsParams{
		UserEmail:           request.UserId,
		OrganisationGroupID: request.OrganisationGroupId,
	}
	// convert provided password and username to hash with salt
	// check for the hash string match or not
	user, err := store.GetInstance().GetUserDetails(ctx, args)
	if err != nil {
		plogger.Error("User fetching failed ", err)
		if err == sql.ErrNoRows {
			plogger.Error("User doesn't exist!", err)
			ctx.JSON(http.StatusUnauthorized, gin.H{apierror.MESSAGE: "Incorrect user or password"})
			return
		}
	}
	plogger.Debug(user.UserEmail, " ", user.Username, " is retrieve from db!")

	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(request.Password))
	if err != nil {
		plogger.Error("Password Not matched! ", err)
		ctx.JSON(http.StatusUnauthorized, gin.H{apierror.MESSAGE: "Incorrect user or password"})
		return
	}

	// respond with a paseto / jwt for further login
	response := generateLoginSession(user.UserEmail, user.OrganisationGroupID, ctx.Request.UserAgent(), ctx.ClientIP())

	response.Username = user.Username
	response.OrganisationGroupId = user.OrganisationGroupID

	plogger.Debug(request.UserId, " is logged in successfully!")

	// not working IDK why
	ctx.SetCookie("AccessToken", response.AccessToken, TokenAgeInSeconds, "/", "www.yogveda.live", false, false)
	ctx.JSON(http.StatusOK, response)
}

var currentUser string
var currentOrganisationId string

func SetCurrentUser(username string) {
	currentUser = username
}

func GetCurrentUser() string {
	return currentUser
}

func SetCurrentOrganisationId(orgId string) {
	currentOrganisationId = orgId
}

func GetCurrentOrganisationId() string {
	return currentOrganisationId
	// todo : implement this
	//return "org_yogveda"
}

func SetUserPermission() {

}

func GetUserPermission() string {
	return ""
}

func generateLoginSession(useremail string, currentOrgId string, useragent string, clientip string) *loginResponse {
	//var auth services.Auth
	tokenMaker, err := NewPasetoMaker()
	if err != nil {
		plogger.Error("Paseto Maker Failed ! ", err)
		return nil
	}
	token, err := tokenMaker.CreateToken(useremail, currentOrgId, TokenAgeInSeconds*time.Second)
	if err != nil {
		plogger.Error("Token Creation Failed ! ", err)
		return nil
	}

	session, err := CreateSession(useremail, currentOrgId, useragent, clientip)
	if err != nil {
		plogger.Error("Error creating session for ", useremail, err)
	}
	return &loginResponse{
		AccessToken:  token,
		RefreshToken: session.RefreshToken,
		ExpiresAt:    session.ExpiresAt.UTC().String(),
	}
}
