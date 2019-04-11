import * as React from 'react';
import downloadYear, { Year } from './fetch-events';
import Table from './components/Table';
import Loader from './components/Loader';
import sortBy from 'lodash.sortby';
import { BrowserRouter as Router, Route, Link, RouteComponentProps } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import YearComponent from './pages/Year';

interface AppState {
    years: Year[],
    loading: Boolean,
    showHamburger: boolean
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            years: [],
            loading: true,
            showHamburger: false
        };
    }

    async componentDidMount() {
        downloadYear('2019', 'https://raw.githubusercontent.com/Readify/DevEvents/master/readme.md')
            .then(year =>
                this.setState({
                    years: sortBy([...this.state.years, year], 'year').reverse(),
                    loading: false
                })
            );

        downloadYear('2018', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2018.md')
            .then(year =>
                this.setState({
                    years: sortBy([...this.state.years, year], 'year').reverse(),
                    loading: false
                })
            );

        downloadYear('2017', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2017.md')
            .then(year =>
                this.setState({
                    years: sortBy([...this.state.years, year], 'year').reverse(),
                    loading: false
                })
            );

        downloadYear('2016', 'https://raw.githubusercontent.com/Readify/DevEvents/master/2016.md')
            .then(year =>
                this.setState({
                    years: sortBy([...this.state.years, year], 'year').reverse(),
                    loading: false
                })
            );
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar" role="navigation" aria-label="main navigation">
                        <div className="navbar-brand">
                            <span className="navbar-item">
                                Australian Tech Events
                            </span>

                            <a role="button" className={`navbar-burger ${this.state.showHamburger ? 'is-active' : '' }`} aria-label="menu" aria-expanded="false" data-target="navbar" onClick={() => this.setState({ showHamburger: !this.state.showHamburger })}>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                                <span aria-hidden="true"></span>
                            </a>
                        </div>

                        <div id="navbar" className={`navbar-menu ${this.state.showHamburger ? 'is-active' : '' }`}>
                            <div className="navbar-start">
                                <Link to="/" className="navbar-item">Home</Link>
                                <Link to="/about" className="navbar-item">About</Link>
                                {!this.state.loading &&
                                    <div className="navbar-item has-dropdown is-hoverable">
                                        <a className="navbar-link">
                                            Years
                                        </a>

                                        <div className="navbar-dropdown">
                                            {this.state.years.map(year => <Link className="navbar-item" to={`/year/${year.year}`} key={year.year}>{year.year}</Link>)}
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </nav>
                    <Route exact path="/" component={() => <Home loading={this.state.loading} years={this.state.years} />} />
                    <Route path="/about" component={About} />
                    <Route path="/year/:year" component={(props: RouteComponentProps<{ year: string }>) => <YearComponent year={this.state.years.filter(year => year.year === props.match.params.year)[0]} loading={this.state.loading} />} />
                </div>
            </Router>
        );
    }
}

export default App;