import { Planet, PlanetResponse, transformPlanetResponse } from '.';

test('should transform PlanetResponse to Planet', () => {
  const planetResponse: PlanetResponse = {
    climate: 'temperate',
    created: '2022-01-01',
    diameter: '10000',
    edited: '2022-01-02',
    films: ['film1', 'film2'],
    gravity: '1 standard',
    name: 'Planet Name',
    orbital_period: '365',
    population: '1000000',
    residents: ['person1', 'person2'],
    rotation_period: '24',
    surface_water: '50',
    terrain: 'mountains, forests',
    url: 'planet-url',
  };

  const expectedPlanet: Planet = {
    climate: 'temperate',
    diameter: '10000',
    films: [
      { url: 'film1', child: null },
      { url: 'film2', child: null },
    ],
    gravity: '1 standard',
    name: 'Planet Name',
    orbitalPeriod: '365',
    population: '1000000',
    residents: [
      { url: 'person1', child: null },
      { url: 'person2', child: null },
    ],
    rotationPeriod: '24',
    surfaceWater: '50',
    terrain: 'mountains, forests',
    url: 'planet-url',
  };

  const transformedPlanet = transformPlanetResponse(planetResponse);
  expect(transformedPlanet).toEqual(expectedPlanet);
});
