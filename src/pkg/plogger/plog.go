package plogger

func Info(args ...interface{}) {
	stdLog.Info(args...)
}

func Warn(args ...interface{}) {
	stdLog.Warn(args...)
}

func Error(args ...interface{}) {
	stdLog.Error(args...)
}

func Debug(args ...interface{}) {
	stdLog.Debug(args...)
}

func Fatal(args ...interface{}) {
	stdLog.Fatal(args...)
}

func Panic(args ...interface{}) {
	stdLog.Panic(args...)
}
