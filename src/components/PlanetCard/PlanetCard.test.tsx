import { render, screen, fireEvent, act } from '@testing-library/react';
import { PlanetCard } from './PlanetCard';
import { planetMock } from '../../data-models/Planet.test';

describe('PlanetCard', () => {
  const onSubmitMock = jest.fn();

  beforeEach(() => {
    act(() => render(<PlanetCard planet={planetMock} onSubmit={onSubmitMock} />));
  });

  it('should render the person card with correct values', () => {
    const nameField = screen.getByLabelText('Name:');
    const climateField = screen.getByLabelText('Climate:');
    const diameterField = screen.getByLabelText('Diameter:');
    const gravityField = screen.getByLabelText('Gravity:');
    const orbitalPeriodField = screen.getByLabelText('Orbital Period:');
    const populationField = screen.getByLabelText('Population:');
    const rotationPeriodField = screen.getByLabelText('Rotation Period:');
    const surfaceWaterField = screen.getByLabelText('Surface Water:');
    const terrainField = screen.getByLabelText('Terrain:');

    expect(nameField).toHaveValue(planetMock.name);
    expect(climateField).toHaveValue(planetMock.climate);
    expect(diameterField).toHaveValue(planetMock.diameter);
    expect(gravityField).toHaveValue(planetMock.gravity);
    expect(orbitalPeriodField).toHaveValue(planetMock.orbitalPeriod);
    expect(populationField).toHaveValue(planetMock.population);
    expect(rotationPeriodField).toHaveValue(planetMock.rotationPeriod);
    expect(surfaceWaterField).toHaveValue(planetMock.surfaceWater);
    expect(terrainField).toHaveValue(planetMock.terrain);
  });

  it('should call onSubmit when the form is submitted with updated values', async () => {
    const nameField = screen.getByLabelText('Name:');
    const climateField = screen.getByLabelText('Climate:');
    const diameterField = screen.getByLabelText('Diameter:');
    const gravityField = screen.getByLabelText('Gravity:');
    const orbitalPeriodField = screen.getByLabelText('Orbital Period:');
    const populationField = screen.getByLabelText('Population:');
    const rotationPeriodField = screen.getByLabelText('Rotation Period:');
    const surfaceWaterField = screen.getByLabelText('Surface Water:');
    const terrainField = screen.getByLabelText('Terrain:');
    const saveBtn = screen.getByText('Save');
    await act(() => {
      fireEvent.change(nameField, { target: { value: 'nameField' } });
      fireEvent.change(climateField, { target: { value: 'climateField' } });
      fireEvent.change(diameterField, { target: { value: 'diameterField' } });
      fireEvent.change(gravityField, { target: { value: 'gravityField' } });
      fireEvent.change(orbitalPeriodField, { target: { value: 'orbitalPeriodField' } });
      fireEvent.change(populationField, { target: { value: 'populationField' } });
      fireEvent.change(rotationPeriodField, { target: { value: 'rotationPeriodField' } });
      fireEvent.change(surfaceWaterField, { target: { value: 'surfaceWaterField' } });
      fireEvent.change(terrainField, { target: { value: 'terrainField' } });
      fireEvent.submit(saveBtn);
    });
    expect(onSubmitMock).toHaveBeenCalledWith({
      ...planetMock,
      name: 'nameField',
      climate: 'climateField',
      diameter: 'diameterField',
      gravity: 'gravityField',
      orbitalPeriod: 'orbitalPeriodField',
      population: 'populationField',
      rotationPeriod: 'rotationPeriodField',
      surfaceWater: 'surfaceWaterField',
      terrain: 'terrainField',
    });
  });

  it('should reset the form when the reset button is clicked', () => {
    const nameField = screen.getByLabelText('Name:');
    const resetButton = screen.getByText('Reset');
    fireEvent.change(nameField, { target: { value: 'Updated Name' } });
    fireEvent.click(resetButton);
    expect(nameField).toHaveValue(planetMock.name);
  });
});
