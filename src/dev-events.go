package main

import (
	"encoding/json"
	"syscall/js"

	markdowntools "./markdown-tools"
	"github.com/aaronpowell/webpack-golang-wasm-async-loader/gobridge"
)

func parseMarkdown(_ js.Value, args []js.Value) (interface{}, error) {
	md := args[0].String()
	year := markdowntools.ParseMarkdown(md)
	bytes, _ := json.Marshal(year)
	return string(bytes), nil
}

func main() {
	c := make(chan struct{}, 0)
	gobridge.RegisterCallback("parseMarkdown", parseMarkdown)

	<-c
}
