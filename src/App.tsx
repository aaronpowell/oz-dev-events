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

        downloadYear('2017', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2018.md')
            .then(year =>
                this.setState({
                    years: [...this.state.years, year],
                    loading: false
                })
            );

        downloadYear('2016', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2018.md')
            .then(year =>
                this.setState({
                    years: [...this.state.years, year],
                    loading: false
                })
            );
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                    <Loader /> :
                    sortBy(this.state.years, 'year').reverse().map(year => <Table year={year} key={year.year} />)}
            </div>
        );
    }
}

export default App;