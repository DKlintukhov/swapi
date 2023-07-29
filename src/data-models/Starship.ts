import { Film, ChildProxy, Person, makeChildProxy } from '.';
import { Entity } from './Entity';

export interface StarshipResponse {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

export interface Starship extends Entity {
  MGLT: string;
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  crew: string;
  hyperdriveRating: string;
  length: string;
  manufacturer: string;
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  films: ChildProxy<Film>[];
  pilots: ChildProxy<Person>[];
  starshipClass: string;
  url: string;
}

export const transformStarshipResponse = (resp: StarshipResponse): Starship => ({
  MGLT: resp.MGLT,
  cargoCapacity: resp.cargo_capacity,
  consumables: resp.consumables,
  costInCredits: resp.cost_in_credits,
  crew: resp.crew,
  hyperdriveRating: resp.hyperdrive_rating,
  length: resp.length,
  manufacturer: resp.manufacturer,
  maxAtmospheringSpeed: resp.max_atmosphering_speed,
  model: resp.model,
  name: resp.name,
  passengers: resp.passengers,
  films: resp.films.map(makeChildProxy<Film>),
  pilots: resp.pilots.map(makeChildProxy<Person>),
  starshipClass: resp.starship_class,
  url: resp.url,
});
