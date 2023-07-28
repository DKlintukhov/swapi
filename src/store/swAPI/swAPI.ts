import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Page,
  Film,
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
    searchPerson: query<Page, string>({
      query: (search: string) => ({
        url: `people/?search=${search}`,
      }),
      transformResponse: transformPageResponse,
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
  useSearchPersonQuery,
  useLazySearchPersonQuery,
  useGetPlanetQuery,
  useGetStarshipQuery,
  useGetFilmQuery,
  useGetSpeciesQuery,
  useGetVehicleQuery,
} = swAPI;
