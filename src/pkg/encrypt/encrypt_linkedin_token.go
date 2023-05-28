package encrypt

import (
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"socialhub-server/env"
	"socialhub-server/pkg/plogger"
)

var bytes = []byte{35, 46, 57, 24, 85, 35, 24, 74, 87, 35, 88, 98, 66, 32, 14, 05}

func EncryptToken(token string) string {
	key := []byte(env.AESEncryptionKey)
	block, err := aes.NewCipher(key)
	if err != nil {
		plogger.Error("err :", err)
		plogger.Error(aes.KeySizeError(len(key)))
	}

	plainText := []byte(token)
	cfb := cipher.NewCFBEncrypter(block, bytes)
	encryptedToken := make([]byte, len(plainText))
	cfb.XORKeyStream(encryptedToken, []byte(token))

	//plogger.Info(string(encryptedToken))

	return Encode(string(encryptedToken))
}

func Encode(b string) string {
	return base64.StdEncoding.EncodeToString([]byte(b))
}

func Decode(b string) string {
	byteArr, err := base64.StdEncoding.DecodeString(b)
	if err != nil {
		plogger.Error(err)
		return ""
	}
	return string(byteArr)
}

func DecryptToken(payload string) string {
	key := []byte(env.AESEncryptionKey)
	block, err := aes.NewCipher(key)
	if err != nil {
		plogger.Error("err :", err)
		plogger.Error(aes.KeySizeError(len(key)))
	}

	cipherText := []byte(Decode(payload))
	cfb := cipher.NewCFBDecrypter(block, bytes)

	plainText := make([]byte, len(cipherText))
	cfb.XORKeyStream(plainText, cipherText)

	//plogger.Debug(string(plainText))
	return string(plainText)
}
