import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';
import './App.css';

const DEBOUNCED_INTERVAL = 2000;

const useData = () => {
  const API_URL = 'http://localhost:8080';

  const [data, setData] = useState([]);
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
        setData(result.data);
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
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="input ip address example 100.1.2.3"
        />
        <div>
          {isError && <div>An error had occurred ...</div>}
          {isLoading ? <div>Loading ... </div> : <div>{JSON.stringify(data)}</div>}
        </div>
      </header>
    </div>
  );
}

export default App;
