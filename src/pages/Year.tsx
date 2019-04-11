import * as React from 'react';
import { Year } from '../fetch-events';
import Loader from '../components/Loader';
import Table from '../components/Table';

interface YearProps {
    year: Year,
    loading: Boolean
}

const YearComponent : React.SFC<YearProps> = ({ year, loading }) => (
    loading ? <Loader /> :
              <Table year={year} key={year.year} />
);

export default YearComponent;