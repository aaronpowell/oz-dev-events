package markdowntools

import (
	"strings"

	"github.com/gomarkdown/markdown"
	"github.com/gomarkdown/markdown/ast"
	"github.com/gomarkdown/markdown/parser"
)

// Event that is happening
type Event struct {
	Name     string   `json:"name"`
	Link     string   `json:"link"`
	State    string   `json:"state"`
	DateFrom string   `json:"fromDate"`
	DateTo   string   `json:"toDate"`
	Tags     []string `json:"tags"`
}

// Year represents all the events for that year
type Year struct {
	Events [][]*Event `json:"events"`
}

func contentToString(d1 []byte, d2 []byte) string {
	if d1 != nil {
		return string(d1)
	}
	if d2 != nil {
		return string(d2)
	}
	return ""
}

func getContent(node ast.Node) string {
	if c := node.AsContainer(); c != nil {
		return contentToString(c.Literal, c.Content)
	}
	leaf := node.AsLeaf()
	return contentToString(leaf.Literal, leaf.Content)
}

func makeEvent(row *ast.TableRow) *Event {
	cells := row.Children
	event := Event{}

	if len(cells) < 5 {
		return nil
	}

	for i, cell := range cells {
		switch i {
		case 0:
			if len(cell.GetChildren()) > 1 {
				link := cell.GetChildren()[1].(*ast.Link)
				event.Name = getContent(link.GetChildren()[0].(*ast.Text))
				event.Link = string(link.Destination)
			} else {
				event.Name = getContent(cell.GetChildren()[0].(*ast.Text))
			}
		case 1:
			txt := cell.GetChildren()[0].(*ast.Text)
			event.State = getContent(txt)
		case 2:
			txt := cell.GetChildren()[0].(*ast.Text)
			event.DateFrom = getContent(txt)
		case 3:
			c := cell.GetChildren()
			if len(c) == 0 {
				event.DateTo = event.DateFrom
			} else {
				txt := c[0].(*ast.Text)
				event.DateTo = getContent(txt)
			}
		case 6:
			txt := cell.GetChildren()[0].(*ast.Text)
			tags := strings.Split(getContent(txt), ",")
			event.Tags = tags
		}

	}

	return &event
}

func processTable(table *ast.Table) []*Event {
	for _, tablePiece := range table.GetChildren() {
		if body, ok := tablePiece.(*ast.TableBody); ok {
			rows := body.GetChildren()
			var events []*Event

			for _, row := range rows {
				event := makeEvent(row.(*ast.TableRow))

				if event != nil {
					events = append(events, event)
				}
			}

			return events
		}
	}
	return make([]*Event, 0)
}

// ParseMarkdown does stuff
func ParseMarkdown(md string) Year {
	extensions := parser.CommonExtensions | parser.AutoHeadingIDs | parser.Tables
	parser := parser.NewWithExtensions(extensions)
	syntax := markdown.Parse([]byte(md), parser)

	year := Year{}

	for _, child := range syntax.GetChildren() {
		if table, ok := child.(*ast.Table); ok {
			events := processTable(table)

			if len(events) > 0 {
				year.Events = append(year.Events, events)
			}

		}
	}

	return year
}
