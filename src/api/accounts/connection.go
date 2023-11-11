package accounts

import (
	"context"
	"database/sql"
	"encoding/json"
	"github.com/gin-gonic/gin"
	"net/http"
	"socialhub-server/api/authZ"
	sqlcmodels "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/apierror"
	"socialhub-server/pkg/plogger"
)

type LinkedinAccountInfo struct {
	URN string `json:"urn"`
}

func LinkedinConnectedAccountInfo(ctx *gin.Context) {
	args := sqlcmodels.FetchLinkedinURNbyAccountIdParams{
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		UserEmail:           authZ.GetCurrentUser(),
	}

	urn, err := store.GetInstance().FetchLinkedinURNbyAccountId(context.Background(), args)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusOK, gin.H{"account": "0"})
			return
		}

		plogger.Error("Error while getting the connected linkedin accounts! ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"account": LinkedinAccountInfo{URN: urn}})
}

type TwitterAccountInfo struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Name     string `json:"name"`
}

func TwitterConnectedAccountInfo(ctx *gin.Context) {
	args := sqlcmodels.TwitterAccountAccessTokens_fetchAccountInfoByUserEmailParams{
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		UserEmail:           authZ.GetCurrentUser(),
	}

	row, err := store.GetInstance().TwitterAccountAccessTokens_fetchAccountInfoByUserEmail(context.Background(), args)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusOK, gin.H{"account": "0"})
			return
		}

		plogger.Error("Error while getting the connected linkedin accounts! ", err)
		ctx.JSON(http.StatusInternalServerError, apierror.UnexpectedError)
		return
	}

	if row.TwitterID != "" {
		plogger.Debug("fetched account info- ", row.TwitterID, row.TwitterUsername)
		ctx.JSON(http.StatusOK, gin.H{"account": TwitterAccountInfo{Id: row.TwitterID, Username: row.TwitterUsername}})
		return
	}

	twitterMeAPI := "https://api.twitter.com/2/users/me"
	meInfoRequest, _ := http.NewRequest("GET", twitterMeAPI, nil)

	meInfoRequest.Header.Add("Authorization", "Bearer "+row.AccessToken)

	resp, err := http.DefaultClient.Do(meInfoRequest)
	if err != nil {
		plogger.Error(err)
	}
	plogger.Info(resp.StatusCode)
	defer resp.Body.Close()

	var respObj struct {
		Data struct {
			Id       string `json:"id"`
			Username string `json:"username"`
			Name     string `json:"name"`
		} `json:"data"`
	}

	err = json.NewDecoder(resp.Body).Decode(&respObj)
	if err != nil {
		plogger.Error(err)
	}

	plogger.Info("Hello")
	plogger.Info(respObj.Data.Username)

	upsertArgs := sqlcmodels.TwitterAccountAccessTokens_updateUsernameAndIdParams{
		TwitterID:           respObj.Data.Id,
		TwitterUsername:     respObj.Data.Username,
		OrganisationGroupID: authZ.GetCurrentOrganisationId(),
		UserEmail:           authZ.GetCurrentUser(),
	}

	accInfo, err := store.GetInstance().TwitterAccountAccessTokens_updateUsernameAndId(context.Background(), upsertArgs)
	if err != nil {
		plogger.Error("Error updating twitter account info ", err)
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"account": map[string]interface{}{"username": accInfo.TwitterUsername}})
}
