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
      query: (page) => ({
        url: `people/?page=${page}`
      }),
      transformResponse: transformPageResponse,
    }),
    searchPerson: query<Page, string>({
      query: (search) => ({
        url: `people/?search=${search}`,
      }),
      transformResponse: transformPageResponse,
    }),
    getPlanet: query<Planet, string>({
      query: (id) => ({
        url: `planets/${id}/`,
      }),
      transformResponse: transformPlanetResponse,
    }),
    getStarship: query<Starship, string>({
      query: (id) => ({
        url: `starships/${id}/`
      }),
      transformResponse: transformStarshipResponse,
    }),
    getFilm: query<Film, string>({
      query: (id) => ({
        url: `films/${id}/`
      }),
      transformResponse: transformFilmResponse,
    }),
    getSpecies: query<Species, string>({
      query: (id) => ({
        url: `species/${id}/`
      }),
      transformResponse: transformSpeciesResponse,
    }),
    getVehicle: query<Vehicle, string>({
      query: (id) => ({
        url: `vehicles/${id}/`
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
  useLazyGetPlanetQuery,
  useGetStarshipQuery,
  useLazyGetStarshipQuery,
  useGetFilmQuery,
  useLazyGetFilmQuery,
  useGetSpeciesQuery,
  useLazyGetSpeciesQuery,
  useGetVehicleQuery,
  useLazyGetVehicleQuery
} = swAPI;
