import * as React from "react";
import { Year } from "../fetch-events";
import Loader from "../components/Loader";
import sortBy from "lodash.sortby";
import Table from "../components/Table";

interface HomeProps {
  years: Year[];
  loading: Boolean;
}

const Home: React.SFC<HomeProps> = ({ years, loading }) =>
  loading ? (
    <Loader />
  ) : (
    <div>
      {sortBy(years, "year")
        .reverse()
        .map((year) => (
          <Table year={year} key={year.year} />
        ))}
    </div>
  );

export default Home;
