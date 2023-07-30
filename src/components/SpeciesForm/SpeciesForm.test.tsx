import { render, screen, fireEvent, act } from '@testing-library/react';
import { SpeciesForm } from './SpeciesForm';
import { speciesMock } from '../../data-models/Species.test';

describe('SpeciesForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<SpeciesForm data={speciesMock} onSubmit={mockOnSubmit} onDelete={mockOnDelete} />);
  });

  it('renders all form fields', () => {
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Language:')).toBeInTheDocument();
    expect(screen.getByLabelText('Average Height:')).toBeInTheDocument();
    expect(screen.getByLabelText('Average Lifespan:')).toBeInTheDocument();
    expect(screen.getByLabelText('Classification:')).toBeInTheDocument();
    expect(screen.getByLabelText('Eye Colors:')).toBeInTheDocument();
    expect(screen.getByLabelText('Hair Colors:')).toBeInTheDocument();
    expect(screen.getByLabelText('Skin Colors:')).toBeInTheDocument();
    expect(screen.getByLabelText('Designation:')).toBeInTheDocument();
  });

  it('submits the form with updated data', async () => {
    await act(() => {
      fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Updated Name' } });
      fireEvent.change(screen.getByLabelText('Language:'), { target: { value: 'Spanish' } });
      fireEvent.change(screen.getByLabelText('Average Height:'), { target: { value: '6 feet' } });
      fireEvent.change(screen.getByLabelText('Average Lifespan:'), { target: { value: '90 years' } });
      fireEvent.change(screen.getByLabelText('Classification:'), { target: { value: 'Reptile' } });
      fireEvent.change(screen.getByLabelText('Eye Colors:'), { target: { value: 'Blue' } });
      fireEvent.change(screen.getByLabelText('Hair Colors:'), { target: { value: 'Blonde' } });
      fireEvent.change(screen.getByLabelText('Skin Colors:'), { target: { value: 'Pale' } });
      fireEvent.change(screen.getByLabelText('Designation:'), { target: { value: 'Non-sentient' } });
      fireEvent.submit(screen.getByRole('submit'));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...speciesMock,
      name: 'Updated Name',
      language: 'Spanish',
      averageHeight: '6 feet',
      averageLifespan: '90 years',
      classification: 'Reptile',
      eyeColors: 'Blue',
      hairColors: 'Blonde',
      skinColors: 'Pale',
      designation: 'Non-sentient',
    });
  });
});