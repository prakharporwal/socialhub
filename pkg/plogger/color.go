package plogger

import (
	"github.com/fatih/color"
	"github.com/sirupsen/logrus"
)

type colorFunc func(args ...any) string

func getColorFunc(s logrus.Level) colorFunc {
	switch s {
	case logrus.WarnLevel:
		return color.New(color.FgHiYellow).SprintFunc()
	case logrus.InfoLevel:
		return color.New(color.FgGreen).SprintFunc()
	case logrus.PanicLevel:
		return color.New(color.BgRed).SprintFunc()
	case logrus.FatalLevel, logrus.ErrorLevel:
		return color.New(color.FgRed).SprintFunc()
	default:
		return color.New(color.FgHiWhite).SprintFunc()
	}
}
