import { renderHook, act } from '@testing-library/react-hooks';
import { useData } from './useData';
import axios from 'axios';

jest.mock('axios');

test('should return correct value', async () => {
  const mockedData = { ip: '123.123.123.123', countryCode: 'CN', timezone: 'Asia/Shanghai' };
  axios.get.mockResolvedValueOnce({ data: mockedData });
  const { result, waitForNextUpdate } = renderHook(() => useData());

  await act(async () => {
    result.current.setQuery('123.123.123.123');
    await waitForNextUpdate();
  });

  expect(axios.get).toHaveBeenCalledWith('http://localhost:8080/data?ip=8.8.8.8');
  expect(result.current.data).toEqual(mockedData);
  expect(result.current.query).toBe('123.123.123.123');
  expect(result.current.isLoading).toBe(false);
  expect(result.current.isError).toBe(false);
})
