import { Film, Person, ChildProxy, makeChildProxy } from '.';
import { Entity } from './Entity';

export interface SpeciesResponse {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
}

export interface Species extends Entity {
  averageHeight: string;
  averageLifespan: string;
  classification: string;
  designation: string;
  eyeColors: string;
  hairColors: string;
  homeworld: string;
  language: string;
  name: string;
  people: ChildProxy<Person>[];
  films: ChildProxy<Film>[];
  skinColors: string;
  url: string;
}

export const transformSpeciesResponse = (resp: SpeciesResponse): Species => ({
  averageHeight: resp.average_height,
  averageLifespan: resp.average_lifespan,
  classification: resp.classification,
  designation: resp.designation,
  eyeColors: resp.eye_colors,
  hairColors: resp.hair_colors,
  homeworld: resp.homeworld,
  language: resp.language,
  name: resp.name,
  people: resp.people.map(makeChildProxy<Person>),
  films: resp.films.map(makeChildProxy<Film>),
  skinColors: resp.skin_colors,
  url: resp.url,
});
