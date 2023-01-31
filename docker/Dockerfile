
FROM golang:1.17.3 as builder
RUN mkdir /src
COPY ./server /src
RUN go version
RUN cd /src && go mod tidy && go build


FROM ubuntu:18.04 as runstage
COPY --from=builder /src/broker /usr/local/bin
RUN broker --help 


## After build, erase builder image
## docker image prune -f
