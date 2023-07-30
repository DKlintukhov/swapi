import { ChildProxy, Film, Person, makeChildProxy } from '.';
import { Entity } from './Entity';

export interface PlanetResponse {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface Planet extends Entity {
  climate: string;
  diameter: string;
  films: ChildProxy<Film>[];
  gravity: string;
  name: string;
  orbitalPeriod: string;
  population: string;
  residents: ChildProxy<Person>[];
  rotationPeriod: string;
  surfaceWater: string;
  terrain: string;
  url: string;
}

export const transformPlanetResponse = (resp: PlanetResponse): Planet => ({
  climate: resp.climate,
  diameter: resp.diameter,
  films: resp.films.map(makeChildProxy<Film>),
  gravity: resp.gravity,
  name: resp.name,
  orbitalPeriod: resp.orbital_period,
  population: resp.population,
  residents: resp.residents.map(makeChildProxy<Person>),
  rotationPeriod: resp.rotation_period,
  surfaceWater: resp.surface_water,
  terrain: resp.terrain,
  url: resp.url,
});
