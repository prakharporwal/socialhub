package authZ

import (
	"fmt"
	"github.com/aead/chacha20poly1305"
	"github.com/o1egl/paseto/v2"
	"socialhub-server/env"
	"time"
)

type PasetoMaker struct {
	paseto       *paseto.V2
	symmetricKey []byte
}

func NewPasetoMaker() (TokenMaker, error) {
	if len(env.SymmetricKey) != chacha20poly1305.KeySize {
		return nil, fmt.Errorf("invalid key size must be exactly %d", chacha20poly1305.KeySize)
	}
	return &PasetoMaker{
		paseto:       paseto.NewV2(),
		symmetricKey: []byte(env.SymmetricKey),
	}, nil
}

func (pasetoMaker *PasetoMaker) CreateToken(username string, currentOrgId string, duration time.Duration) (string, error) {
	payload := NewPayload(username, currentOrgId, duration)

	return pasetoMaker.paseto.Encrypt(pasetoMaker.symmetricKey, payload, nil)
}

func (pasetoMaker *PasetoMaker) VerifyToken(token string) (*Payload, error) {
	payload := &Payload{}

	err := pasetoMaker.paseto.Decrypt(token, pasetoMaker.symmetricKey, payload, nil)
	if err != nil {
		return nil, ErrInvalidToken
	}

	err = payload.Valid()
	if err != nil {
		return nil, err
	}

	return payload, nil
}
