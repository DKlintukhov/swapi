import { Person, PersonResponse, transformPersonResponse } from '.';

export const personResponseMock: PersonResponse = {
  birth_year: '1990',
  eye_color: 'blue',
  films: ['https://link/0/', 'https://link/1/'],
  gender: 'male',
  hair_color: 'brown',
  height: 180,
  homeworld: 'https://link/0/',
  mass: 75,
  name: 'John Doe',
  skin_color: 'fair',
  created: '2022-01-01',
  edited: '2022-01-02',
  species: ['https://link/0/', 'https://link/1/'],
  starships: ['https://link/0/', 'https://link/1/'],
  url: 'https://link/0/',
  vehicles: ['https://link/0/', 'https://link/1/'],
};

export const personMock: Person = {
  birthYear: '1990',
  eyeColor: 'blue',
  films: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  gender: 'male',
  hairColor: 'brown',
  height: 180,
  homeworld: { url: personResponseMock.homeworld, child: null, id: '0', },
  mass: 75,
  name: 'John Doe',
  skinColor: 'fair',
  species: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  starships: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  vehicles: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  url: 'https://link/0/',
};

it('should transform PersonResponse to Person', () => {
  const transformedPerson = transformPersonResponse(personResponseMock);
  expect(transformedPerson).toEqual(personMock);
});
