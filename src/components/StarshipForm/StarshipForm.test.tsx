import { render, screen, fireEvent, act } from '@testing-library/react';
import { StarshipForm } from './StarshipForm';
import { starshipMock } from '../../data-models/Starship.test';

describe('StarshipForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<StarshipForm starship={starshipMock} onSubmit={mockOnSubmit} />);
  });

  it('renders all form fields', () => {
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Starship Class:')).toBeInTheDocument();
    expect(screen.getByLabelText('Model:')).toBeInTheDocument();
    expect(screen.getByLabelText('Length:')).toBeInTheDocument();
    expect(screen.getByLabelText('Manufacturer:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cargo Capacity:')).toBeInTheDocument();
    expect(screen.getByLabelText('Consumables:')).toBeInTheDocument();
    expect(screen.getByLabelText('Crew:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cost In Credits:')).toBeInTheDocument();
    expect(screen.getByLabelText('Hyperdrive Rating:')).toBeInTheDocument();
    expect(screen.getByLabelText('MGLT:')).toBeInTheDocument();
    expect(screen.getByLabelText('Max Atmosphering Speed:')).toBeInTheDocument();
    expect(screen.getByLabelText('Passengers:')).toBeInTheDocument();
  });

  it('submits the form with updated data', async () => {
    await act(() => {
      fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Name' } });
      fireEvent.change(screen.getByLabelText('Starship Class:'), { target: { value: 'Starship Class' } });
      fireEvent.change(screen.getByLabelText('Model:'), { target: { value: 'Model' } });
      fireEvent.change(screen.getByLabelText('Length:'), { target: { value: 'Length' } });
      fireEvent.change(screen.getByLabelText('Manufacturer:'), { target: { value: 'Manufacturer' } });
      fireEvent.change(screen.getByLabelText('Cargo Capacity:'), { target: { value: 'Cargo Capacity' } });
      fireEvent.change(screen.getByLabelText('Consumables:'), { target: { value: 'Consumables' } });
      fireEvent.change(screen.getByLabelText('Crew:'), { target: { value: 'Crew' } });
      fireEvent.change(screen.getByLabelText('Cost In Credits:'), { target: { value: 'Cost In Credits' } });
      fireEvent.change(screen.getByLabelText('Hyperdrive Rating:'), { target: { value: 'Hyperdrive Rating' } });
      fireEvent.change(screen.getByLabelText('MGLT:'), { target: { value: 'MGLT' } });
      fireEvent.change(screen.getByLabelText('Max Atmosphering Speed:'), { target: { value: 'Max Atmosphering Speed' } });
      fireEvent.change(screen.getByLabelText('Passengers:'), { target: { value: 'Passengers' } });
      fireEvent.submit(screen.getByText('Save'));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...starshipMock,
      name: 'Name',
      starshipClass: 'Starship Class',
      model: 'Model',
      length: 'Length',
      cargoCapacity: 'Cargo Capacity',
      consumables: 'Consumables',
      costInCredits: 'Cost In Credits',
      crew: 'Crew',
      hyperdriveRating: 'Hyperdrive Rating',
      manufacturer: 'Manufacturer',
      maxAtmospheringSpeed: 'Max Atmosphering Speed',
      MGLT: 'MGLT',
      passengers: 'Passengers',
    });
  });
});