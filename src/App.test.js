import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import * as hooks from './useData';

test('renders input textfield', () => {
  render(<App />);

  expect(screen.getByText('ip address')).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByText('input ip address example 100.1.2.3')).toBeInTheDocument();
});

test('renders progress indicator', () => {
  jest.spyOn(hooks, 'useData').mockImplementation(() => [{ data: {}, query: '', isLoading: true, isError: false }, jest.fn()])

  render(<App />);

  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});

test('does not render progress indicator', () => {
  jest.spyOn(hooks, 'useData').mockImplementation(() => [{ data: {}, query: '', isLoading: false, isError: false }, jest.fn()])

  render(<App />);

  expect(screen.queryByRole('progressbar')).toBeNull();
});

test('render correct data', () => {
  jest.spyOn(hooks, 'useData').mockImplementation(() => [{ data: { ip: '8.8.8.8', countryCode: 'US', timezone: 'America/New York' }, query: '', isLoading: false, isError: false }, jest.fn()])

  render(<App />);

  expect(screen.getByText('8.8.8.8')).toBeInTheDocument();
  expect(screen.getByTestId('FlagIcon')).toBeInTheDocument();
  expect(screen.getByText('US')).toBeInTheDocument();
  expect(screen.getByTestId('AccessTimeIcon')).toBeInTheDocument();
  expect(screen.getByText('America/New York')).toBeInTheDocument();
});

test('call setQuery', () => {
  const setQuerySpy = jest.fn();
  jest.spyOn(hooks, 'useData').mockImplementation(() => [{ data: {}, query: '', isLoading: false, isError: false }, setQuerySpy])

  render(<App />);

  const input = screen.getByRole('textbox');

  userEvent.type(input, '2.2.2.2')
  expect(setQuerySpy).toHaveBeenCalledTimes(7);
});
