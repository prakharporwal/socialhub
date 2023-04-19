package plogger

import "fmt"

type logger interface {
	Warn()
	Error()
	Debug()
	Fatal()
}

func Error(args ...interface{}) {
	fmt.Print("ERROR:")
	fmt.Println(args...)
}

func Info(args ...interface{}) {
	fmt.Print("INFO:")
	fmt.Println(args...)
}
