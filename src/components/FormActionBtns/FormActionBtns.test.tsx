import { render, screen, fireEvent } from '@testing-library/react';
import { FormActionBtns } from './FormActionBtns';

describe('FormActionBtns', () => {
  it('should call onCancel when the cancel button is clicked', () => {
    const handleCancelMock = jest.fn();
    const handleResetMock = jest.fn();

    render(<FormActionBtns onCancel={handleCancelMock} onReset={handleResetMock} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(handleCancelMock).toHaveBeenCalledTimes(1);
    expect(handleResetMock).not.toHaveBeenCalled();
  });

  it('should call onReset when the reset button is clicked', () => {
    const handleCancelMock = jest.fn();
    const handleResetMock = jest.fn();

    render(<FormActionBtns onReset={handleResetMock} onCancel={handleCancelMock} />);

    const resetButton = screen.getByText('Reset');

    fireEvent.click(resetButton);

    expect(handleResetMock).toHaveBeenCalledTimes(1);
    expect(handleCancelMock).not.toHaveBeenCalled();
  });
});
