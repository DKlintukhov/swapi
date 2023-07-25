import { Species, SpeciesResponse, transformSpeciesResponse } from '.';

test('should transform SpeciesResponse to Species', () => {
  const speciesResponse: SpeciesResponse = {
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
    people: ['person1', 'person2'],
    films: ['film1', 'film2'],
    skin_colors: 'fair, dark',
    url: 'species-url',
  };

  const expectedSpecies: Species = {
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
      { url: 'person1', child: null },
      { url: 'person2', child: null },
    ],
    films: [
      { url: 'film1', child: null },
      { url: 'film2', child: null },
    ],
    skinColors: 'fair, dark',
    url: 'species-url',
  };

  const transformedSpecies = transformSpeciesResponse(speciesResponse);
  expect(transformedSpecies).toEqual(expectedSpecies);
});
