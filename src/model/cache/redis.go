package cache

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v9"
	"socialhub-server/pkg/plogger"
)

const RedisAddr = "13.233.195.130:6379"

func GetCacheValue(ctx *gin.Context) {
	key := ctx.Query("key")
	plogger.Debug(key)
	client := redis.NewClient(&redis.Options{
		Addr: RedisAddr,
		DB:   1,
	})

	plogger.Debug("redis client", &client)

	out, err := client.Get(context.Background(), "hello").Result()
	if err != nil {
		plogger.Error("out", err)
	}
	plogger.Debug("read value", out)

	ctx.JSON(200, out)
}
