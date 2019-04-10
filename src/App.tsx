import * as React from 'react';
import downloadYear, { Year } from './fetch-events';
import Table from './components/Table';
import Loader from './components/Loader';
import sortBy from 'lodash.sortby';

interface AppState {
    years: Year[],
    loading: Boolean
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            years: [],
            loading: true
        };
    }

    async componentDidMount() {
        downloadYear('2019', 'https://raw.githubusercontent.com/Readify/DevEvents/master/readme.md')
            .then(year =>
                this.setState({
                    years: [...this.state.years, year],
                    loading: false
                })
            );

        downloadYear('2018', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2018.md')
            .then(year =>
                this.setState({
                    years: [...this.state.years, year],
                    loading: false
                })
            );

        downloadYear('2017', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2017.md')
            .then(year =>
                this.setState({
                    years: [...this.state.years, year],
                    loading: false
                })
            );

        downloadYear('2016', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2016.md')
            .then(year =>
                this.setState({
                    years: [...this.state.years, year],
                    loading: false
                })
            );
    }

    render() {
        return (
            <div className="container">
                <h1 className="title">Australian Technology Events</h1>
                <p className="subtitle">
                    Welcome to the Australia Technology Events list.
                    This website provides a easy to interact with view of the data maintained by <a href="https://github.com/readify/devevents" target="_blank">Readify</a> and built by <a href="https://www.aaron-powell.com" target="_blank">Aaron Powell</a> as an <a href="https://github.com/aaronpowell/oz-dev-events" target="_blank">experiment using WebAssembly and Go.</a>
                </p>
                {this.state.loading ?
                    <Loader /> :
                    sortBy(this.state.years, 'year').reverse().map(year => <Table year={year} key={year.year} />)}
            </div>
        );
    }
}

export default App;