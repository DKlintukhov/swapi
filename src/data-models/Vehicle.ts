import { Person, ChildProxy, Film } from '.';

export interface VehicleResponse {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  url: string;
  vehicle_class: string;
}

export interface Vehicle {
  cargoCapacity: string;
  consumables: string;
  costInCredits: string;
  crew: string;
  length: string;
  manufacturer: string;
  maxAtmospheringSpeed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: ChildProxy<Person>[];
  films: ChildProxy<Film>[];
  url: string;
  vehicleClass: string;
}

export const transformVehicleResponse = (resp: VehicleResponse): Vehicle => ({
  cargoCapacity: resp.cargo_capacity,
  consumables: resp.consumables,
  costInCredits: resp.cost_in_credits,
  crew: resp.crew,
  length: resp.length,
  manufacturer: resp.manufacturer,
  maxAtmospheringSpeed: resp.max_atmosphering_speed,
  model: resp.model,
  name: resp.name,
  passengers: resp.passengers,
  pilots: resp.pilots.map((url) => ({ url, child: null })),
  films: resp.films.map((url) => ({ url, child: null })),
  url: resp.url,
  vehicleClass: resp.vehicle_class,
});
