import { json } from 'stream/consumers';
import { Film, Species, Starship, Vehicle, ChildProxy } from '.';

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

export interface Person {
  birthYear: string;
  eyeColor: string;
  films: ChildProxy<Film>[];
  gender: string;
  hairColor: string;
  height: number;
  homeworld: string;
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
    films: resp.films.map((url) => ({ url, child: null })),
    gender: resp.gender,
    hairColor: resp.hair_color,
    height: resp.height,
    homeworld: resp.homeworld,
    mass: resp.mass,
    name: resp.name,
    skinColor: resp.skin_color,
    url: resp.url,
    species: resp.species.map((url) => ({ url, child: null })),
    starships: resp.starships.map((url) => ({ url, child: null })),
    vehicles: resp.vehicles.map((url) => ({ url, child: null })),
  }
);
