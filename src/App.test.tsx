import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

test('should be rendered', () => {
  const result = render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>);
  expect(result).toBeTruthy();
});
