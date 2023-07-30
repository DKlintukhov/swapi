import { Starship, StarshipResponse, transformStarshipResponse } from '.';

export const starshipResponseMock: StarshipResponse = {
  MGLT: '60',
  cargo_capacity: '100',
  consumables: '1 month',
  cost_in_credits: '100000',
  created: '2022-01-01',
  crew: '10',
  edited: '2022-01-02',
  hyperdrive_rating: '2.0',
  length: '50',
  manufacturer: 'Manufacturer Name',
  max_atmosphering_speed: '1000',
  model: 'Model Name',
  name: 'Starship Name',
  passengers: '20',
  films: ['https://link/0/', 'https://link/1/'],
  pilots: ['https://link/0/', 'https://link/1/'],
  starship_class: 'Starship Class',
  url: 'starship-url',
};

export const starshipMock: Starship = {
  MGLT: '60',
  cargoCapacity: '100',
  consumables: '1 month',
  costInCredits: '100000',
  crew: '10',
  hyperdriveRating: '2.0',
  length: '50',
  manufacturer: 'Manufacturer Name',
  maxAtmospheringSpeed: '1000',
  model: 'Model Name',
  name: 'Starship Name',
  passengers: '20',
  films: [
    { url: 'https://link/0/', child: null, id: '0',  },
    { url: 'https://link/1/', child: null, id: '1',  },
  ],
  pilots: [
    { url: 'https://link/0/', child: null, id: '0',  },
    { url: 'https://link/1/', child: null, id: '1',  },
  ],
  starshipClass: 'Starship Class',
  url: 'starship-url',
};

it('should transform StarshipResponse to Starship', () => {
  const transformedStarship = transformStarshipResponse(starshipResponseMock);
  expect(transformedStarship).toEqual(starshipMock);
});
