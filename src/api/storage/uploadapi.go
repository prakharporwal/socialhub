package storage

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io/ioutil"
	"net/http"
	"os"
	"socialhub-server/services/uploadservice"
)

//type loginRequest struct {
//	file string `json:"username"`
//}

// Working as expected
func UploadToBucket(c *gin.Context) {
	uploadservice.Upload()
	file, err := c.FormFile("image")
	if err != nil {
		fmt.Println("Error retrieving file:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file"})
		return
	}

	// Open the file for reading
	f, err := file.Open()
	if err != nil {
		fmt.Println("Error opening file:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error opening file"})
		return
	}
	defer f.Close()

	// Read the file contents
	data, err := ioutil.ReadAll(f)
	if err != nil {
		fmt.Println("Error reading file:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error reading file"})
		return
	}

	// Process the file data (e.g., save it to a database, perform analysis)
	fmt.Println("Received file:", file.Filename, "size:", len(data))

	// ... rest of your code ...

	// Save the file to a specific directory
	currentPath, err := os.Getwd()
	if err != nil {
		fmt.Println("Error getting current working directory:", err)
		// Handle the error appropriately
		return
	}

	filePath := currentPath + "/" + file.Filename
	err = ioutil.WriteFile(filePath, data, 0644)
	if err != nil {
		fmt.Println("Error saving file:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error saving file"})
		return
	}

	fmt.Println("File saved successfully:", filePath)
	c.JSON(http.StatusOK, gin.H{"message": "File uploaded and saved successfully"})
}
