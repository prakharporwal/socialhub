.phony: build

build:
	GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/socialhub

builddocker:
	docker build -t socialhub:${VERSION} .