package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"fmt"
	"github.com/jpillora/opts"

	markdowntools ".."
)

type cli struct {
	Year  string `opts:"help=Year to load,default=readme"`
}

func main() {
	c := cli{Year: "readme"}
	opts.Parse(&c)

	resp, err := http.Get(fmt.Sprintf("https://raw.githubusercontent.com/Readify/DevEvents/master/%s.md", c.Year))
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
