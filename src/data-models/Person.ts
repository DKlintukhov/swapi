import { Film, Species, Starship, Vehicle, ChildProxy, Planet, makeChildProxy } from '.';
import { Entity } from './Entity';

export interface PersonResponse {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: number;
  homeworld: string;
  mass: number;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

export interface Person extends Entity {
  birthYear: string;
  eyeColor: string;
  films: ChildProxy<Film>[];
  gender: string;
  hairColor: string;
  height: number;
  homeworld: ChildProxy<Planet>;
  mass: number;
  name: string;
  skinColor: string;
  species: ChildProxy<Species>[];
  starships: ChildProxy<Starship>[];
  vehicles: ChildProxy<Vehicle>[];
  url: string;
}

export const transformPersonResponse = (resp: PersonResponse): Person => (
  {
    birthYear: resp.birth_year,
    eyeColor: resp.eye_color,
    films: resp.films.map(makeChildProxy<Film>),
    gender: resp.gender,
    hairColor: resp.hair_color,
    height: resp.height,
    homeworld: makeChildProxy<Planet>(resp.homeworld),
    mass: resp.mass,
    name: resp.name,
    skinColor: resp.skin_color,
    url: resp.url,
    species: resp.species.map(makeChildProxy<Species>),
    starships: resp.starships.map(makeChildProxy<Starship>),
    vehicles: resp.vehicles.map(makeChildProxy<Vehicle>),
  }
);
