import React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useData } from './useData';
import DataCard from './DataCard';

function App() {
  const { data, query, isLoading, isError, setQuery } = useData();

  return (
    <Container maxWidth="sm" sx={{ marginTop: "100px" }}>
      <TextField
        error={isError}
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
