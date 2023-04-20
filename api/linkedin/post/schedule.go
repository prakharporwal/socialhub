package post

import (
	"context"
	"github.com/gin-gonic/gin"
	models "socialhub-server/model/sqlc"
	"socialhub-server/model/store"
	"socialhub-server/pkg/plogger"
)

func ScheduleANewPost(c *gin.Context) {

	args := models.LinkedinScheduleUserPostParams{}
	row, err := store.GetInstance().LinkedinScheduleUserPost(context.Background(), args)
	if err != nil {
		plogger.Error("Error getting post ", err)
		return
	}

	plogger.Info(row.ScheduledPostID)
	plogger.Info(row.ScheduledTime)

	//c.JSON(http.StatusOK, gin.H{"message": "schedule post for " + time})
}

func SchedulePost() {

}
