import * as React from 'react';
import devEvents from './dev-events.go';

interface Event {
    name: string
    state: string
    fromDate: string
    toDate: string
    tags: string[]
    link: string
}

interface AppState {
    year: {
        events?: Event[][]
    }
}

const printGroup = (events: Event[]) => {
    let rows = events.map((event) => {
        return (
            <tr>
                <td>{event.name}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            year: { }
        }
    }
    async componentDidMount() {
        let response = await fetch('https://raw.githubusercontent.com/Readify/DevEvents/master/readme.md');
        let content = await response.text()

        let year = JSON.parse(await devEvents.parseMarkdown(content));

        this.setState({ year });
    }

    render() {
        return (
            <div>
                {this.state.year.events ? this.state.year.events.map(printGroup) : ""}
            </div>
        );
    }
}

export default App;