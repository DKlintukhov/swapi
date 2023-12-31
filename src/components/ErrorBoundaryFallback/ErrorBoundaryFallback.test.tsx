import { render, fireEvent } from '@testing-library/react';
import { FallbackProps } from 'react-error-boundary';
import { ErrorBoundaryFallback } from './ErrorBoundaryFallback';
import { BrowserRouter } from 'react-router-dom';

describe('ErrorBoundaryFallback', () => {
  const resetErrorBoundaryMock = jest.fn();

  const fallbackProps: FallbackProps = {
    error: new Error('Test error'),
    resetErrorBoundary: resetErrorBoundaryMock,
  };

  it('should render the fallback UI correctly', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter><ErrorBoundaryFallback {...fallbackProps} /></BrowserRouter>
    );

    const alertTitle = getByText('Error');
    expect(alertTitle).toBeInTheDocument();

    const errorMessage = getByText('Something went wrong...');
    expect(errorMessage).toBeInTheDocument();

    const closeIcon = getByLabelText('close');
    expect(closeIcon).toBeInTheDocument();
  });

  it('should call resetErrorBoundary when close icon is clicked', () => {
    const { getByLabelText } = render(
      <BrowserRouter><ErrorBoundaryFallback {...fallbackProps} /></BrowserRouter>
    );

    const closeIcon = getByLabelText('close');
    fireEvent.click(closeIcon);

    expect(resetErrorBoundaryMock).toHaveBeenCalled();
  });
});