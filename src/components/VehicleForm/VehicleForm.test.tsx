import { render, screen, fireEvent, act } from '@testing-library/react';
import { VehicleForm } from './VehicleForm';
import { vehicleMock } from '../../data-models/Vehicle.test';

describe('VehicleForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    render(<VehicleForm data={vehicleMock} onSubmit={mockOnSubmit} onDelete={mockOnDelete}/>);
  });

  it('renders all form fields', () => {
    expect(screen.getByLabelText('Name:')).toBeInTheDocument();
    expect(screen.getByLabelText('Vehicle Class:')).toBeInTheDocument();
    expect(screen.getByLabelText('Model:')).toBeInTheDocument();
    expect(screen.getByLabelText('Length:')).toBeInTheDocument();
    expect(screen.getByLabelText('Manufacturer:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cargo Capacity:')).toBeInTheDocument();
    expect(screen.getByLabelText('Consumables:')).toBeInTheDocument();
    expect(screen.getByLabelText('Crew:')).toBeInTheDocument();
    expect(screen.getByLabelText('Cost In Credits:')).toBeInTheDocument();
    expect(screen.getByLabelText('Max Atmosphering Speed:')).toBeInTheDocument();
    expect(screen.getByLabelText('Passengers:')).toBeInTheDocument();
  });

  it('submits the form with updated data', async () => {
    await act(() => {
      fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Name' } });
      fireEvent.change(screen.getByLabelText('Vehicle Class:'), { target: { value: 'Vehicle Class' } });
      fireEvent.change(screen.getByLabelText('Model:'), { target: { value: 'Model' } });
      fireEvent.change(screen.getByLabelText('Length:'), { target: { value: 'Length' } });
      fireEvent.change(screen.getByLabelText('Manufacturer:'), { target: { value: 'Manufacturer' } });
      fireEvent.change(screen.getByLabelText('Cargo Capacity:'), { target: { value: 'Cargo Capacity' } });
      fireEvent.change(screen.getByLabelText('Consumables:'), { target: { value: 'Consumables' } });
      fireEvent.change(screen.getByLabelText('Crew:'), { target: { value: 'Crew' } });
      fireEvent.change(screen.getByLabelText('Cost In Credits:'), { target: { value: 'Cost In Credits' } });
      fireEvent.change(screen.getByLabelText('Max Atmosphering Speed:'), { target: { value: 'Max Atmosphering Speed' } });
      fireEvent.change(screen.getByLabelText('Passengers:'), { target: { value: 'Passengers' } });
      fireEvent.submit(screen.getByRole('submit'));
    });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...vehicleMock,
      name: 'Name',
      vehicleClass: 'Vehicle Class',
      model: 'Model',
      length: 'Length',
      cargoCapacity: 'Cargo Capacity',
      consumables: 'Consumables',
      costInCredits: 'Cost In Credits',
      crew: 'Crew',
      manufacturer: 'Manufacturer',
      maxAtmospheringSpeed: 'Max Atmosphering Speed',
      passengers: 'Passengers',
    });
  });
});
