package authZ

import (
	"github.com/golang-jwt/jwt/v4"
	"github.com/google/uuid"
	"time"
)

type Payload struct {
	Id                  uuid.UUID `json:"id"`
	Username            string    `json:"username"`
	OrganisationGroupID string    `json:"organisation_group_id"`
	IssuedAt            time.Time `json:"issued_at"`
	ExpiresAt           time.Time `json:"expires_at"`
}

func (payload *Payload) Valid() error {
	if payload.ExpiresAt.Before(time.Now()) {
		return jwt.ErrTokenExpired
	}
	return nil
}

func NewPayload(username string, currentOrgId string, duration time.Duration) *Payload {
	id, _ := uuid.NewRandom()
	currTime := time.Now()

	return &Payload{
		Id:                  id,
		Username:            username,
		OrganisationGroupID: currentOrgId,
		IssuedAt:            currTime,
		ExpiresAt:           currTime.Add(duration),
	}
}

type TokenMaker interface {
	CreateToken(username string, currentOrgId string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
}
