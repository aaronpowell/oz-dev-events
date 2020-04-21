package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"fmt"

	markdowntools ".."
)

func main() {
	resp, err := http.Get("https://raw.githubusercontent.com/Readify/DevEvents/master/readme.md")
	if err != nil {
		println(err)
	} else {
		defer resp.Body.Close()
		body, _ := ioutil.ReadAll(resp.Body)
		year := markdowntools.ParseMarkdown(string(body))
		bytes, _ := json.MarshalIndent(year, "", "  ")
		fmt.Println(string(bytes))
	}
}
