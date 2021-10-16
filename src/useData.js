import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

const DEBOUNCED_INTERVAL = 2000;

export const useData = () => {
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
