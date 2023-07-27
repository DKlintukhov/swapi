import { render, screen, fireEvent, act } from '@testing-library/react';
import { PersonCard } from './PersonCard';
import { personMock } from '../../data-models/Person.test';

describe('PersonCard', () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    act(() => render(<PersonCard person={personMock} onSubmit={onSubmitMock} />));
  });

  it('should render the person card with correct values', () => {
    const nameField = screen.getByLabelText('Name');
    const genderField = screen.getByLabelText('Gender');
    const birthYearField = screen.getByLabelText('Birth Year:');
    const heightField = screen.getByLabelText('Height:');
    const massField = screen.getByLabelText('Mass:');
    const eyeColorField = screen.getByLabelText('Eye Color:');
    const hairColorField = screen.getByLabelText('Hair Color:');
    const skinColorField = screen.getByLabelText('Skin Color:');

    expect(nameField).toHaveValue(personMock.name);
    expect(genderField).toHaveValue(personMock.gender);
    expect(birthYearField).toHaveValue(personMock.birthYear);
    expect(heightField).toHaveValue(personMock.height);
    expect(massField).toHaveValue(personMock.mass);
    expect(eyeColorField).toHaveValue(personMock.eyeColor);
    expect(hairColorField).toHaveValue(personMock.hairColor);
    expect(skinColorField).toHaveValue(personMock.skinColor);
  });

  it('should call onSubmit when the form is submitted with updated values', async () => {
    const nameField = screen.getByLabelText('Name');
    const genderField = screen.getByLabelText('Gender');
    const birthYearField = screen.getByLabelText('Birth Year:');
    const heightField = screen.getByLabelText('Height:');
    const massField = screen.getByLabelText('Mass:');
    const eyeColorField = screen.getByLabelText('Eye Color:');
    const hairColorField = screen.getByLabelText('Hair Color:');
    const skinColorField = screen.getByLabelText('Skin Color:');
    const saveBtn = screen.getByText('Save');
    await act(() => {
      fireEvent.change(nameField, { target: { value: 'Updated Name' } });
      fireEvent.change(genderField, { target: { value: 'Updated Gender' } });
      fireEvent.change(birthYearField, { target: { value: 'Updated Birth Year' } });
      fireEvent.change(heightField, { target: { value: '180' } });
      fireEvent.change(massField, { target: { value: '80' } });
      fireEvent.change(eyeColorField, { target: { value: 'Updated Eye Color' } });
      fireEvent.change(hairColorField, { target: { value: 'Updated Hair Color' } });
      fireEvent.change(skinColorField, { target: { value: 'Updated Skin Color' } });
      fireEvent.submit(saveBtn);
    });
    expect(onSubmitMock).toHaveBeenCalledWith({
      ...personMock,
      name: 'Updated Name',
      gender: 'Updated Gender',
      birthYear: 'Updated Birth Year',
      height: 180,
      mass: 80,
      eyeColor: 'Updated Eye Color',
      hairColor: 'Updated Hair Color',
      skinColor: 'Updated Skin Color',
    });
  });

  it('should reset the form when the reset button is clicked', () => {
    const nameField = screen.getByLabelText('Name');
    const resetButton = screen.getByText('Reset');
    fireEvent.change(nameField, { target: { value: 'Updated Name' } });
    fireEvent.click(resetButton);
    expect(nameField).toHaveValue(personMock.name);
  });
});
