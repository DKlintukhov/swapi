import { render, screen, fireEvent } from '@testing-library/react';
import { PlanetForm } from './PlanetForm';
import { act } from 'react-dom/test-utils';
import { planetMock } from '../../data-models/Planet.test';

describe('PlanetForm', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    render(<PlanetForm planet={planetMock} onSubmit={jest.fn()} />);
  });

  it('renders form fields with correct default values', () => {
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

  it('calls onSubmit with updated film data on form submission', async () => {
    const nameField = screen.getByLabelText('Name:');
    const climateField = screen.getByLabelText('Climate:');
    const diameterField = screen.getByLabelText('Diameter:');
    const gravityField = screen.getByLabelText('Gravity:');
    const orbitalPeriodField = screen.getByLabelText('Orbital Period:');
    const populationField = screen.getByLabelText('Population:');
    const rotationPeriodField = screen.getByLabelText('Rotation Period:');
    const surfaceWaterField = screen.getByLabelText('Surface Water:');
    const terrainField = screen.getByLabelText('Terrain:');

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
      fireEvent.submit(screen.getByText('Save'));
    });

    setTimeout(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        ...planetMock,
        name: 'nameField',
        climate: 'climateField',
        diameter: 'diameterField',
        gravity: 'gravityField',
        orbitalPeriod: 'orbitalPeriodField',
        population: 'populationField',
        rotationPeriod: 'rotationPeriodField',
        surfaceWater: 'surfaceWaterField',
        terrain: 'terrainField'
      });
    })
  });
});
