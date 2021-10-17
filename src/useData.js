import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDebounce } from 'use-debounce';

const DEBOUNCED_INTERVAL = 2000;
const API_URL = process.env.REACT_APP_API_URL;

export const useData = () => {
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
        const result = await axios.get(url);
        setData(Object.assign({}, { ip: value }, result.data));
      } catch (error) {
        setData('Data not available')
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, query, isLoading, isError, setQuery };
};
