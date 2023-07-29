import { render, screen, fireEvent } from '@testing-library/react';
import { FormActionBtns } from './FormActionBtns';

describe('FormActionBtns', () => {
  it('should call onDelete when the delete button is clicked', () => {
    const handleDeleteMock = jest.fn();
    const handleResetMock = jest.fn();

    render(<FormActionBtns onDelete={handleDeleteMock} onReset={handleResetMock} />);

    const cancelButton = screen.getByRole('delete');
    fireEvent.click(cancelButton);

    expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  it('should call onReset when the reset button is clicked', () => {
    const handleCancelMock = jest.fn();
    const handleResetMock = jest.fn();

    render(<FormActionBtns onReset={handleResetMock} onDelete={handleCancelMock} />);

    const resetButton = screen.getByRole('reset');

    fireEvent.click(resetButton);

    expect(handleResetMock).toHaveBeenCalledTimes(1);
    expect(handleCancelMock).not.toHaveBeenCalled();
  });
});
