import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';

describe('Form', () => {
  const handleDeletelMock = jest.fn();
  const handleResetMock = jest.fn();
  const handleSubmitMock = jest.fn();

  beforeEach(() => {
    render(<Form onDelete={handleDeletelMock} onReset={handleResetMock} onSubmit={handleSubmitMock}><></></Form>);
  });

  it('should call onDelete when the cancel button is clicked', () => {
    const cancelButton = screen.getByRole('delete');
    fireEvent.click(cancelButton);

    expect(handleDeletelMock).toHaveBeenCalledTimes(1);
  });

  it('should call onReset when the reset button is clicked', () => {
    const resetButton = screen.getByRole('reset');
    fireEvent.click(resetButton);

    expect(handleResetMock).toHaveBeenCalledTimes(1);
  });

  it('should call onSubmit when the reset button is clicked', () => {
    const saveButton = screen.getByRole('submit');
    fireEvent.submit(saveButton);

    expect(handleSubmitMock).toHaveBeenCalledTimes(1);
  });
});
