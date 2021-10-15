import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);

  screen.getByRole('textbox');
  screen.getByPlaceholderText('input ip address example 100.1.2.3');
});
