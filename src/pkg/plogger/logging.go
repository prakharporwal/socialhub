package plogger

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"log"
	"os"
)

type plogging interface {
	Info(args ...interface{})
	Error(args ...interface{})
	Warn(args ...interface{})
	Debug(args ...interface{})
	Fatal(args ...interface{})
	Panic(args ...interface{})
}

type PLogger struct {
	l         *log.Logger
	calldepth int
}

func New() *PLogger {
	kl := PLogger{
		l:         log.Default(),
		calldepth: 3,
	}

	kl.l.SetFlags(log.LstdFlags | log.Lshortfile | log.LUTC | log.Lmicroseconds)
	return &kl
}

var stdLog = New()

func (kl *PLogger) Info(args ...interface{}) {
	kl.l.SetPrefix(getColorFunc(logrus.InfoLevel)("Info: "))
	kl.l.Output(stdLog.calldepth, getColorFunc(logrus.InfoLevel)(fmt.Sprint(args...)))
}

func (kl *PLogger) Error(args ...interface{}) {
	kl.l.SetPrefix(getColorFunc(logrus.ErrorLevel)("Error: "))
	kl.l.Output(stdLog.calldepth, getColorFunc(logrus.ErrorLevel)(fmt.Sprint(args...)))
}

func (kl *PLogger) Warn(args ...interface{}) {
	kl.l.SetPrefix(getColorFunc(logrus.WarnLevel)("Warning: "))
	kl.l.Output(stdLog.calldepth, getColorFunc(logrus.WarnLevel)(fmt.Sprint(args...)))
}

func (kl *PLogger) Debug(args ...interface{}) {
	kl.l.SetPrefix(getColorFunc(logrus.DebugLevel)("Debug: "))
	kl.l.Output(stdLog.calldepth, getColorFunc(logrus.DebugLevel)(fmt.Sprint(args...)))
}

func (kl *PLogger) Fatal(args ...interface{}) {
	kl.l.SetPrefix(getColorFunc(logrus.FatalLevel)("FATAL: "))
	kl.l.Output(stdLog.calldepth, getColorFunc(logrus.FatalLevel)(fmt.Sprint(args...)))
	os.Exit(1)
}

func (kl *PLogger) Panic(args ...interface{}) {
	kl.l.SetPrefix("PANIC: ")
	s := getColorFunc(logrus.PanicLevel)(fmt.Sprint(args...))
	kl.l.Output(stdLog.calldepth, s)
	panic(s)
}
