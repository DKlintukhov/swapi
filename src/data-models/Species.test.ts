import { Species, SpeciesResponse, transformSpeciesResponse } from '.';

export const speciesResponseMock: SpeciesResponse = {
  average_height: '180',
  average_lifespan: '80',
  classification: 'mammal',
  created: '2022-01-01',
  designation: 'sentient',
  edited: '2022-01-02',
  eye_colors: 'green, blue',
  hair_colors: 'black, brown',
  homeworld: 'planet1',
  language: 'english',
  name: 'Species Name',
  people: ['https://link/0/', 'https://link/1/'],
  films: ['https://link/0/', 'https://link/1/'],
  skin_colors: 'fair, dark',
  url: 'species-url',
};

export const speciesMock: Species = {
  averageHeight: '180',
  averageLifespan: '80',
  classification: 'mammal',
  designation: 'sentient',
  eyeColors: 'green, blue',
  hairColors: 'black, brown',
  homeworld: 'planet1',
  language: 'english',
  name: 'Species Name',
  people: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  films: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  skinColors: 'fair, dark',
  url: 'species-url',
};

it('should transform SpeciesResponse to Species', () => {
  const transformedSpecies = transformSpeciesResponse(speciesResponseMock);
  expect(transformedSpecies).toEqual(speciesMock);
});
