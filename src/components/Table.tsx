import * as React from 'react';
import { Year, Event } from '../fetch-events';
import './table.css';
import sortBy from 'lodash.sortby';
import moment from 'moment';

interface ITableProps {
    year: Year
}

interface ITableState {
    events: Event[]
    allEvents: Event[]
    direction: 'asc' | 'desc'
    column: string
    selectedState: string
    tagFilter: string
    hidePastEvents: boolean
}

const performSort = (field: string, direction: string, events: Event[]) =>
    direction === 'asc' ? sortBy(events, field).reverse() : sortBy(events, field);

class Table extends React.Component<ITableProps, ITableState> {
    constructor(props: ITableProps) {
        super(props);

        let events = props.year.events.reduce((prev, e) => [...prev, ...e]);

        this.state = {
            events: events,
            allEvents: events,
            column: 'fromDate',
            selectedState: '',
            direction: 'desc',
            tagFilter: '',
            hidePastEvents: props.year.year === moment().year().toString()
        };
    }

    componentDidUpdate(prevProps: ITableProps, prevState: ITableState) {
        if (prevState.column === this.state.column &&
            prevState.direction === this.state.direction &&
            prevState.hidePastEvents === this.state.hidePastEvents &&
            prevState.tagFilter === this.state.tagFilter &&
            prevState.selectedState === this.state.selectedState) {
            return;
        }

        let events = this.filterEvents(this.state.allEvents);

        this.setState({
            events: performSort(this.state.column, this.state.direction, events)
        });
    }

    componentDidMount() {
        let events = this.filterEvents(this.state.allEvents);

        this.setState({
            events: performSort(this.state.column, this.state.direction, events)
        });
    }

    filterEvents(events: Event[]) {
        return events
        .filter(e => this.state.hidePastEvents ? e.fromDate.isAfter(moment()) : true)
        .filter(e => this.state.selectedState ? e.state === this.state.selectedState : true)
        .filter(e => this.state.tagFilter ? e.tags.some(t => t.toLowerCase().indexOf(this.state.tagFilter.toLowerCase()) >= 0) : true)
    }

    filterByState(filter: string) {
        this.setState({
            selectedState: filter
        });
    }

    filterByTags(filter: string) {
        this.setState({
            tagFilter: filter
        });
    }

    sortColumn(column: string) {
        this.setState({
            column: column,
            direction: this.state.direction === 'asc' ? 'desc' : 'asc'
        });
    }

    sortIndicator(name: string) {
        if (this.state.column === name) {
            return this.state.direction === 'asc' ? <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>;
        }
        return null;
    }

    togglePastEvents(checked: boolean) {
        this.setState({
            hidePastEvents: checked
        });
    }

    render() {
        let year = this.props.year;
        let events = this.state.events;
        let rows = events.map((event, i) => {
            return (
                <tr key={i}>
                    <td>
                        <a href={event.link} target="_blank">{event.name}</a>
                    </td>
                    <td>{event.state}</td>
                    <td>{event.fromDate.format('dddd, MMMM Do YYYY')} {event.toDate.isSame(event.fromDate) ? '' : `to ${event.toDate.format('dddd, MMMM Do YYYY')}`}</td>
                    <td>{(event.tags || []).join(', ')}</td>
                </tr>
            );
        });
        
        return (
            <table key={year.year} className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th colSpan={4}>{year.year}</th>
                    </tr>
                    <tr>
                        <th onClick={() => this.sortColumn('name')}>
                            Name
                            {this.sortIndicator('name')}
                        </th>
                        <th>
                            <div>
                                <span onClick={() => this.sortColumn('state')}>
                                    State
                                    {this.sortIndicator('state')}
                                </span>
                            </div>
                            <div className="select">
                                <select onChange={e => this.filterByState(e.target.value)}>
                                    <option value="">Filter...</option>
                                    {this.state.allEvents.map(e => e.state)
                                    .reduce((u, c) => u.includes(c) ? u : [...u, c], [])
                                    .map(s => <option value={s} key={s}>{s}</option>)}
                                </select>
                            </div>
                        </th>
                        <th>
                            <div onClick={() => this.sortColumn('fromDate')}>
                                When
                                {this.sortIndicator('fromDate')}
                            </div>
                            <div>
                                <label className="checkbox">
                                    <input type="checkbox" onChange={(e) => this.togglePastEvents(e.target.checked)} checked={this.state.hidePastEvents} />{' '}
                                    Hide past events
                                </label>
                            </div>
                        </th>
                        <th>
                            <div className="control has-icons-right">
                                <input className="input is-rounded" placeholder="Tags..." type="search" onChange={e => this.filterByTags(e.target.value)} />
                                <span className="icon is-small is-right">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default Table;