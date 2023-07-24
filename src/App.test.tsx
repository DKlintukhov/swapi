import { render } from '@testing-library/react';
import App from './App';

test('should be rendered', () => {
  const result = render(<App />);
  expect(result).toBeTruthy();
});
