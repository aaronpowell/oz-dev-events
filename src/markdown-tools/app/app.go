package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	markdowntools ".."
)

func main() {
	resp, err := http.Get("https://raw.githubusercontent.com/Readify/DevEvents/master/2018.md")
	if err != nil {
		println(err)
	} else {
		defer resp.Body.Close()
		body, _ := ioutil.ReadAll(resp.Body)
		year := markdowntools.ParseMarkdown(string(body))
		bytes, _ := json.Marshal(year)
		println(string(bytes))
	}
}
