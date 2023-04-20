package utils

import (
	"github.com/google/uuid"
	"net/mail"
	"socialhub-server/pkg/plogger"
	"time"
)

func IsValidEmail(email string) bool {
	// validating using internal go mail lib
	_, err := mail.ParseAddress(email)
	if err != nil {
		plogger.Error("Couldn't validate email address!")
		return false
	}
	return true
}

func GenerateTimeStampNano() int64 {
	return time.Now().UnixNano()
}

func GenerateTimeStampMicro() int64 {
	return time.Now().UnixMicro()
}

func GenerateTimeStampMilli() int64 {
	return time.Now().UnixMilli()
}

func GenerateUUID() uuid.UUID {
	uid, _ := uuid.NewRandom()
	return uid
}
