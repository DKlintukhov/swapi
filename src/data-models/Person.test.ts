import { Person, PersonResponse, transformPersonResponse } from '.';

export const personResponseMock: PersonResponse = {
  birth_year: '1990',
  eye_color: 'blue',
  films: ['film1', 'film2'],
  gender: 'male',
  hair_color: 'brown',
  height: 180,
  homeworld: 'planet1',
  mass: 75,
  name: 'John Doe',
  skin_color: 'fair',
  created: '2022-01-01',
  edited: '2022-01-02',
  species: ['species1', 'species2'],
  starships: ['starship1', 'starship2'],
  url: 'person-url',
  vehicles: ['vehicle1', 'vehicle2'],
};

export const personMock: Person = {
  birthYear: '1990',
  eyeColor: 'blue',
  films: [
    { url: 'film1', child: null },
    { url: 'film2', child: null },
  ],
  gender: 'male',
  hairColor: 'brown',
  height: 180,
  homeworld: { url: personResponseMock.homeworld, child: null },
  mass: 75,
  name: 'John Doe',
  skinColor: 'fair',
  species: [
    { url: 'species1', child: null },
    { url: 'species2', child: null },
  ],
  starships: [
    { url: 'starship1', child: null },
    { url: 'starship2', child: null },
  ],
  vehicles: [
    { url: 'vehicle1', child: null },
    { url: 'vehicle2', child: null },
  ],
  url: 'person-url',
};

test('should transform PersonResponse to Person', () => {
  const transformedPerson = transformPersonResponse(personResponseMock);
  expect(transformedPerson).toEqual(personMock);
});
