import { render, screen } from '@testing-library/react';
import DataCard from './DataCard';

test('renders correct data', () => {
  render(<DataCard data={{
    ip: '0.0.0.0',
    countryCode: 'XXX',
    timezone: 'YYY/ZZZ'
  }} isError={false} />);

  expect(screen.getByText('0.0.0.0')).toBeInTheDocument();
  expect(screen.getByTestId('FlagIcon')).toBeInTheDocument();
  expect(screen.getByText('XXX')).toBeInTheDocument();
  expect(screen.getByTestId('AccessTimeIcon')).toBeInTheDocument();
  expect(screen.getByText('YYY/ZZZ')).toBeInTheDocument();
});

test('renders error message on isError true', () => {
  render(<DataCard data={{}} isError={true} />);

  expect(screen.getByText('an error had occurred ...')).toBeInTheDocument();
});

test('does not render error message on isError false', () => {
  render(<DataCard data={{}} isError={false} />);

  expect(screen.queryByText('an error had occurred ...')).toBeNull();
});