import { render, screen, fireEvent } from '@testing-library/react';
import { PersonForm } from './PersonForm';
import { act } from 'react-dom/test-utils';
import { personMock } from '../../data-models/Person.test';

describe('PersonForm', () => {
  const onSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<PersonForm data={personMock} onSubmit={onSubmit} onDelete={mockOnDelete}/>);
  });

  it('renders form fields with correct default values', () => {
    const nameField = screen.getByLabelText('Name:');
    const genderField = screen.getByLabelText('Gender:');
    const birthYearFeidl = screen.getByLabelText('Birth Year:');
    const eyeColorField = screen.getByLabelText('Eye Color:');
    const heightField = screen.getByLabelText('Height:');
    const massField = screen.getByLabelText('Mass:');
    const skinColorField = screen.getByLabelText('Skin Color:');
    const hairColorField = screen.getByLabelText('Hair Color:');

    expect(nameField).toHaveValue(personMock.name);
    expect(genderField).toHaveValue(personMock.gender);
    expect(birthYearFeidl).toHaveValue(personMock.birthYear);
    expect(eyeColorField).toHaveValue(personMock.eyeColor);
    expect(heightField).toHaveValue(personMock.height);
    expect(massField).toHaveValue(personMock.mass);
    expect(skinColorField).toHaveValue(personMock.skinColor);
    expect(hairColorField).toHaveValue(personMock.hairColor);
  });

  it('calls onSubmit with updated film data on form submission', async () => {
    const nameField = screen.getByLabelText('Name:');
    const genderField = screen.getByLabelText('Gender:');
    const birthYearField = screen.getByLabelText('Birth Year:');
    const eyeColorField = screen.getByLabelText('Eye Color:');
    const heightField = screen.getByLabelText('Height:');
    const massField = screen.getByLabelText('Mass:');
    const skinColorField = screen.getByLabelText('Hair Color:');
    const hairColorField = screen.getByLabelText('Skin Color:');

    await act(() => {
      fireEvent.change(nameField, { target: { value: 'nameField' } });
      fireEvent.change(genderField, { target: { value: 'genderField'} });
      fireEvent.change(birthYearField, { target: { value: 'birthYearFeidl' } });
      fireEvent.change(eyeColorField, { target: { value: 'eyeColorField' } });
      fireEvent.change(heightField, { target: { value: '100' } });
      fireEvent.change(massField, { target: { value: '100' } });
      fireEvent.change(skinColorField, { target: { value: 'skinColorField' } });
      fireEvent.change(hairColorField, { target: { value: 'hairColorField' } });
      fireEvent.submit(screen.getByRole('submit'));
    });

    setTimeout(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...personMock,
        name: 'nameField',
        gender: 'genderField',
        birthYear: 'birthYearFeidl',
        eyeColor: 'eyeColorField',
        height: 100,
        mass: 100,
        skinColor: 'skinColorField',
        hairColor: 'hairColorField',
      });
    });
  });
});
