import { Starship, StarshipResponse, transformStarshipResponse } from '.';

test('should transform StarshipResponse to Starship', () => {
  const starshipResponse: StarshipResponse = {
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
    films: ['film1', 'film2'],
    pilots: ['person1', 'person2'],
    starship_class: 'Starship Class',
    url: 'starship-url',
  };

  const expectedStarship: Starship = {
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
      { url: 'film1', child: null },
      { url: 'film2', child: null },
    ],
    pilots: [
      { url: 'person1', child: null },
      { url: 'person2', child: null },
    ],
    starshipClass: 'Starship Class',
    url: 'starship-url',
  };

  const transformedStarship = transformStarshipResponse(starshipResponse);
  expect(transformedStarship).toEqual(expectedStarship);
});
