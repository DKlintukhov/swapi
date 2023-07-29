import { Planet, PlanetResponse, transformPlanetResponse } from '.';

export const planetResponseMock: PlanetResponse = {
  climate: 'temperate',
  created: '2022-01-01',
  diameter: '10000',
  edited: '2022-01-02',
  films: ['https://link/0/', 'https://link/1/'],
  gravity: '1 standard',
  name: 'Planet Name',
  orbital_period: '365',
  population: '1000000',
  residents: ['https://link/0/', 'https://link/1/'],
  rotation_period: '24',
  surface_water: '50',
  terrain: 'mountains, forests',
  url: 'planet-url',
};

export const planetMock: Planet = {
  climate: 'temperate',
  diameter: '10000',
  films: [
    { url: 'https://link/0/', child: null, id: '0',  },
    { url: 'https://link/1/', child: null, id: '1',  },
  ],
  gravity: '1 standard',
  name: 'Planet Name',
  orbitalPeriod: '365',
  population: '1000000',
  residents: [
    { url: 'https://link/0/', child: null, id: '0',  },
    { url: 'https://link/1/', child: null, id: '1',  },
  ],
  rotationPeriod: '24',
  surfaceWater: '50',
  terrain: 'mountains, forests',
  url: 'planet-url',
};

it('should transform PlanetResponse to Planet', () => {
  const transformedPlanet = transformPlanetResponse(planetResponseMock);
  expect(transformedPlanet).toEqual(planetMock);
});
