import { fireEvent, render, screen } from '@testing-library/react';
import { ErrorMessage } from './ErrorMessage';

describe('ErrorMessage', () => {
  const onRetryMock = jest.fn();

  it('renders default error message', () => {
    render(<ErrorMessage onRetry={onRetryMock}></ErrorMessage>);
    const textMsg = screen.getByText('Something went wrong...');
    expect(textMsg).toBeInTheDocument();
  });

  it('renders error message', () => {
    const msg = 'Failed!';
    render(<ErrorMessage msg={msg} onRetry={onRetryMock}></ErrorMessage>);
    const textMsg = screen.getByText(msg);
    const defaultMsg = screen.queryByText('Something went wrong...');
    expect(textMsg).toBeInTheDocument();
    expect(defaultMsg).toBe(null);
  });

  it('calls onRetry event', async () => {
    render(<ErrorMessage onRetry={onRetryMock}></ErrorMessage>);
    const retryBtn = screen.getByRole('retry');
    fireEvent.click(retryBtn);
    expect(onRetryMock).toHaveBeenCalled();
  });
});
