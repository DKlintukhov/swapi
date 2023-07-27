import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Page,
  PageResponse,
  Film,
  Person,
  Species,
  Starship,
  Vehicle,
  transformFilmResponse,
  transformSpeciesResponse,
  transformStarshipResponse,
  transformVehicleResponse,
  transformPageResponse,
  Planet,
  transformPlanetResponse
} from '../../data-models';

export const swAPI = createApi({
  reducerPath: 'sw/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/'
  }),
  endpoints: ({ query }) => ({
    getPage: query<Page, number>({
      query: (num) => ({
        url: `people/?page=${num}`
      }),
      transformResponse: transformPageResponse,
    }),
    getPerson: query<Person, string>({
      query: (search: string) => ({
        url: `people/?search=${search}`,
      }),
      transformResponse: (resp: PageResponse) => transformPageResponse(resp).people[0],
    }),
    getPlanet: query<Planet, number>({
      query: (num: number) => ({
        url: `planets/${num}/`,
      }),
      transformResponse: transformPlanetResponse,
    }),
    getStarship: query<Starship, number>({
      query: (num: number) => ({
        url: `starships/${num}/`
      }),
      transformResponse: transformStarshipResponse,
    }),
    getFilm: query<Film, number>({
      query: (num: number) => ({
        url: `films/${num}/`
      }),
      transformResponse: transformFilmResponse,
    }),
    getSpecies: query<Species, number>({
      query: (num: number) => ({
        url: `species/${num}/`
      }),
      transformResponse: transformSpeciesResponse,
    }),
    getVehicle: query<Vehicle, number>({
      query: (num: number) => ({
        url: `vehicles/${num}/`
      }),
      transformResponse: transformVehicleResponse,
    }),
  })
});

export const {
  useGetPageQuery,
  useGetPersonQuery,
  useGetPlanetQuery,
  useGetStarshipQuery,
  useGetFilmQuery,
  useGetSpeciesQuery,
  useGetVehicleQuery,
} = swAPI;
