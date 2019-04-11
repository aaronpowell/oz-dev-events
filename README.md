# Australian Tech Events

[![Build Status](https://aaronpowell.visualstudio.com/Australian%20Dev%20Events/_apis/build/status/aaronpowell.oz-dev-events?branchName=master&label=🔨Built%20with%20Azure)](https://aaronpowell.visualstudio.com/Australian%20Dev%20Events/_build/latest?definitionId=23&branchName=master)

This is the source code for the [Australian Tech Events](https://ozdevevents.z8.web.core.windows.net/) website, a web UI over the top of the [Readify DevEvents](https://github.com/readify/devevents) markdown files.

I build this mainly as an exercise in learning how to use [Go](https://golang.org) and [WebAssembly](https://webassembly.org), and how they can fit into a modern web developer toolchain.

At the end of the day this is a [React.js](https://reactjs.org) application, written in [TypeScript](https://www.typescriptlang.org/), using [webpack](https://webpack.js.org/) to compile and bundle the code.

# The Code

The code lives in the `src` folder, with both the TypeScript and Go code all within there. To illustrate the nature of using Go with WebAssembly there is also a Go application that lives in `src/markdown-tools/app`, that loads up the core of the Go codebase (`markdown-tools.go`) and executes a request against a markdown file.

# Running locally

To run it locally you'll need to have the following installed:

1. Node.js (I've tested v10.15.x)
2. Go 1.12.*

Next install the 2 Go modules that are required, the first is the Markdown engine, the 2nd is the [Go WASM bridge that webpack uses](https://github.com/aaronpowell/webpack-golang-wasm-async-loader) (this needs to be installed with Go in WASM mode):

```sh
$> go get github.com/gomarkdown/markdown
$> GOOS=js GOARCH=wasm go get github.com/aaronpowell/webpack-golang-wasm-async-loader/gobridge
```

Finally you can install the node modules and start the `webpack-dev-server`:

```sh
$> npm install
$> npm start
```

# How it works

The application works by compiling the Go part of the application to a WebAssembly binary that is then exposed by a JavaScript bridge (more info can be found [on my blog](https://www.aaron-powell.com/posts/2019-02-12-golang-wasm-6-typescript-react/) for how this works). The React application then communicates via this bridge to the WebAssembly component.

WebAssembly is responsible for:

1. Parsing the markdown
2. Generating a new object model from the markdown
3. Returning the new object model to JavaScript
    * Due to the nature of WebAssembly this is done using JSON, not as 'plain old JavaScript objects'

The web application is responsible for:

1. Making a `fetch` request to download the markdown
2. Binding the object model from WebAssembly to a React UI

The pipeline looks like this:

`fetch` -> WebAssembly -> React.js
