package utils

import (
	"encoding/json"
	"math/rand"
	"socialhub-server/pkg/plogger"
)

func GenerateRandomString(size int) string {
	var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	b := make([]rune, size)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	plogger.Info(string(b))
	return string(b)
}

func Stringify(v any) string {
	byteArr, _ := json.Marshal(v)
	return string(byteArr)
}
