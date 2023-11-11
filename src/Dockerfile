FROM golang:alpine AS builder

# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git
WORKDIR /app/src
COPY . .

RUN go get -d -v

RUN GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/socialhub

FROM scratch
COPY --from=builder /go/bin/socialhub /go/bin/socialhub

EXPOSE 8080

ENTRYPOINT ["/go/bin/socialhub"]