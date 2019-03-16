import * as React from 'react';
import devEvents from './dev-events.go';
import * as moment from 'moment';
import { Moment } from 'moment';

interface Event {
    name: string
    state: string
    fromDate: Moment
    toDate: Moment
    tags: string[]
    link: string
}

interface Year {
    year: string
    events?: Event[][]
}

interface AppState {
    years: Year[]
}

interface GoEvent {
    name: string
    state: string
    fromDate: string
    toDate: string
    tags: string[]
    link: string
}

interface WasmResponse {
    events: GoEvent[][]
}

const printGroup = (year: Year) => {
    let events = year.events.reduce((prev, e) => [...prev, ...e]);
    let rows = events.map((event) => {
        return (
            <tr>
                <td>
                    <a href={event.link} target="_blank">{event.name}</a>
                </td>
                <td>{event.state}</td>
                <td>{event.fromDate.format('dddd, MMMM Do YYYY')} {event.toDate.isSame(event.fromDate) ? '' : `to ${event.toDate.format('dddd, MMMM Do YYYY')}`}</td>
                <td>{event.tags.join(', ')}</td>
            </tr>
        );
    });

    return (
        <table>
            <thead>
                <tr>
                    <th colSpan={4}>{year.year}</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>When</th>
                    <th>Tags</th>
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
            years: []
        }
    }

    async downloadYear(year: string, url: string) {
        let response = await fetch(url);
        let content = await response.text()

        let wasmResponse : WasmResponse = JSON.parse(await devEvents.parseMarkdown<string, string>(content));

        let newState = {
            events: wasmResponse.events.map(group => {
                return group.map(e => {
                    return {
                        name: e.name,
                        link: e.link,
                        state: e.state,
                        tags: e.tags,
                        fromDate: moment(e.fromDate, 'DD-MMM-YYYY'),
                        toDate: moment(e.toDate, 'DD-MMM-YYYY')
                    }
                });
            })
        };

        this.setState({
            years: [...this.state.years, {
                year: year,
                events: newState.events
            }]
         });
    }

    async componentDidMount() {
        await this.downloadYear('2019', 'https://raw.githubusercontent.com/Readify/DevEvents/master/readme.md');
    }

    render() {
        return (
            <div>
                {this.state.years.map(printGroup)}
            </div>
        );
    }
}

export default App;