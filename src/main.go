package main

import (
	"github.com/gin-gonic/gin"
	"socialhub-server/jobs/crons"
	"socialhub-server/pkg/encrypt"
	"socialhub-server/pkg/plogger"
	"socialhub-server/server"
)

func init() {
	gin.SetMode(gin.ReleaseMode)
	plogger.Info("Starting app ....")

	plogger.Info("Setting Up Cron")
	crons.PublishPostsToLinkedin()
}

func main() {
	srv := server.NewServer()

	encrypt.DecryptToken(encrypt.EncryptToken("AQUGV-pjaeFebqJnkRGb9jpkLhywmk6LudFBons_F1BNrVJH6x0nP3BASgWiYWQACmAkUHmIGsNgF98cttWTrVmwP-ZW8UPaWP5iBykTuXq6PvAxicASsMtDheRum9nOWWwDH0_ocOEnp3jYbFhLuTClqQKRO4-m6k0zXO1VuSV-y8KOMKOUiITcZRM26X2adnQvd-p5BepsmXdlOMSvzIhTN6DX1IY5VfQ-X8awpcH5v10QlDr0PHf4j1X7x2ESHJ7nmsokkKA_yfnZO0H-VrG0pxcqGIGTjHE2D7_SYZsqGiJ3TTGdySP80ObN3fSyj8cPr59z2XWtVnKrnBybhLarRAHAewHelloworld!"))
	srv.Start()
	plogger.Info("Server started on 8080")
}
