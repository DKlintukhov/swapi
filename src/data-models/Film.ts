import { ChildProxy } from './ChidProxy';
import { Person, Planet, Species, Starship, Vehicle } from '.';

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

export interface Film {
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
  characters: resp.characters.map((url) => ({ url, child: null })),
  director: resp.director,
  episodeId: resp.episode_id,
  openingCrawl: resp.opening_crawl,
  planets: resp.planets.map((url) => ({ url, child: null })),
  producer: resp.producer,
  releaseDate: resp.release_date,
  species: resp.species.map((url) => ({ url, child: null })),
  starships: resp.starships.map((url) => ({ url, child: null })),
  title: resp.title,
  url: resp.url,
  vehicles: resp.vehicles.map((url) => ({ url, child: null })),
});
