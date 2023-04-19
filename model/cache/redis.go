package cache

import "github.com/redis/go-redis/v9"

var rdClient *redis.Client

func Conn() *redis.Client {

	if rdClient == nil {
		rdClient = redis.NewClient(&redis.Options{
			Addr:     "localhost:6379",
			Password: "db-password",
			DB:       0,
		})
	}

	return rdClient
}
