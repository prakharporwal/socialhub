package utils

import (
	"encoding/json"
)

// JsonToStruct
// converts interface (json) to struct type in go
func JsonToStruct(interfaceData interface{}, item any) error {
	jsonData, err := json.Marshal(interfaceData)
	if err != nil {
		return err
	}
	err = json.Unmarshal([]byte(jsonData), &item)
	return err
}
