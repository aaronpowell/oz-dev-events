FROM node:14
LABEL author="Aaron Powell"
LABEL description="VS Remote environment preconfigured for the demo app"

RUN wget -c https://dl.google.com/go/go1.12.17.linux-amd64.tar.gz -O - | tar -xz -C /usr/local

ENV GOROOT=/usr/local/go GOPATH="$HOME/go" PATH="${PATH}:/usr/local/go/bin"

RUN go get github.com/gomarkdown/markdown && \
    GOOS=js GOARCH=wasm go get github.com/aaronpowell/webpack-golang-wasm-async-loader/gobridge && \
    npm install
