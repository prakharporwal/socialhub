package apierror

import "github.com/gin-gonic/gin"

const MESSAGE = "message"

var (
	UnexpectedError                 = gin.H{MESSAGE: "Something went wrong!"}
	InvalidRequestBody              = gin.H{MESSAGE: "Invalid Request Body. Check the request JSON again!"}
	NotFound                        = gin.H{MESSAGE: "Record Not Found!"}
	Forbidden                       = gin.H{MESSAGE: "You can't access this resource"}
	PasswordValidationFailed        = gin.H{MESSAGE: "Password Length should be 8 or more characters!"}
	PasswordResetTokenUsedorExpired = gin.H{MESSAGE: "This link to change the password has already been used or is very old !"}
)
