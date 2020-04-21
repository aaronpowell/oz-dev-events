import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  RouteComponentProps,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import YearComponent from "./pages/Year";
import useYears from "./hooks/useYears";

const URL_ROOT = "https://raw.githubusercontent.com/Readify/DevEvents/master";

const App: React.FC = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  const [years, loading] = useYears([
    {
      year: "2020",
      url: `${URL_ROOT}/readme.md`,
    },
    {
      year: "2019",
      url: `${URL_ROOT}/Events/2019.md`,
    },
    {
      year: "2018",
      url: `${URL_ROOT}/Events/2018.md`,
    },
    {
      year: "2017",
      url: `${URL_ROOT}/Events/2017.md`,
    },
    {
      year: "2016",
      url: `${URL_ROOT}/Events/2016.md`,
    },
  ]);

  return (
    <Router>
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <span className="navbar-item">Australian Tech Events</span>

            <a
              role="button"
              className={`navbar-burger ${showHamburger ? "is-active" : ""}`}
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar"
              onClick={() => setShowHamburger(!showHamburger)}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div
            id="navbar"
            className={`navbar-menu ${showHamburger ? "is-active" : ""}`}
          >
            <div className="navbar-start">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
              {!loading && (
                <div className="navbar-item has-dropdown is-hoverable">
                  <a className="navbar-link">Years</a>

                  <div className="navbar-dropdown">
                    {years.map((year) => (
                      <Link
                        className="navbar-item"
                        to={`/year/${year.year}`}
                        key={year.year}
                      >
                        {year.year}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
        <Route
          exact
          path="/"
          component={() => <Home loading={loading} years={years} />}
        />
        <Route path="/about" component={About} />
        <Route
          path="/year/:year"
          component={(props: RouteComponentProps<{ year: string }>) => (
            <YearComponent
              year={
                years.filter((year) => year.year === props.match.params.year)[0]
              }
              loading={loading}
            />
          )}
        />
      </div>
    </Router>
  );
};

export default App;
