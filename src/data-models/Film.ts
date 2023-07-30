import { ChildProxy, makeChildProxy } from './ChidProxy';
import { Person, Planet, Species, Starship, Vehicle } from '.';
import { Entity } from './Entity';

export interface FilmResponse {
  characters: string[];
  created: string;
  director: string;
  edited: string;
  episode_id: number;
  opening_crawl: string;
  planets: string[];
  producer: string;
  release_date: string;
  species: string[];
  starships: string[];
  title: string;
  url: string;
  vehicles: string[];
}

export interface Film extends Entity {
  characters: ChildProxy<Person>[];
  director: string;
  episodeId: number;
  openingCrawl: string;
  planets: ChildProxy<Planet>[];
  producer: string;
  releaseDate: string;
  species: ChildProxy<Species>[];
  starships: ChildProxy<Starship>[];
  title: string;
  url: string;
  vehicles: ChildProxy<Vehicle>[];
}

export const transformFilmResponse = (resp: FilmResponse): Film => ({
  characters: resp.characters.map(makeChildProxy<Person>),
  director: resp.director,
  episodeId: resp.episode_id,
  openingCrawl: resp.opening_crawl,
  planets: resp.planets.map(makeChildProxy<Planet>),
  producer: resp.producer,
  releaseDate: resp.release_date,
  species: resp.species.map(makeChildProxy<Species>),
  starships: resp.starships.map(makeChildProxy<Starship>),
  title: resp.title,
  url: resp.url,
  vehicles: resp.vehicles.map(makeChildProxy<Vehicle>),
});
