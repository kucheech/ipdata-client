import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import DataCard from './DataCard';
import CircularProgress from '@mui/material/CircularProgress';

const DEBOUNCED_INTERVAL = 2000;

const useData = () => {
  const API_URL = 'http://localhost:8080';

  const [data, setData] = useState({});
  const [query, setQuery] = useState('8.8.8.8');
  const [value] = useDebounce(query, DEBOUNCED_INTERVAL);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      const url = `${API_URL}/data?ip=${value}`;

      try {
        const result = await axios(url);
        setData(Object.assign({}, { ip: value }, result.data));
        console.log(data)
      } catch (error) {
        setData('Data not available')
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return [{ data, query, isLoading, isError }, setQuery];
};

function App() {
  const [{ data, query, isLoading, isError }, setQuery] = useData();
  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>

      <TextField
        variant="filled"
        value={query}
        onChange={event => setQuery(event.target.value)}
        label="ip address"
        helperText="input ip address example 100.1.2.3"
      />

      <Divider sx={{ margin: "20px 0" }} />

      {isLoading ? <CircularProgress /> : <DataCard data={data} isError={isError} />}

    </Container>
  );
}

export default App;
