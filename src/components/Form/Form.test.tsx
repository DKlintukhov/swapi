import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  const handleCancelMock = jest.fn();
  const handleResetMock = jest.fn();
  const handleSubmitMock = jest.fn();

  beforeEach(() => {
    render(<Form onCancel={handleCancelMock} onReset={handleResetMock} onSubmit={handleSubmitMock}><></></Form>);
  });

  it('should call onCancel when the cancel button is clicked', () => {
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleCancelMock).toHaveBeenCalledTimes(1);
  });

  it('should call onReset when the reset button is clicked', () => {
    const resetButton = screen.getByText('Reset');
    fireEvent.click(resetButton);

    expect(handleResetMock).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit when the reset button is clicked', () => {
    const saveButton = screen.getByText('Save');
    fireEvent.submit(saveButton);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });
});
