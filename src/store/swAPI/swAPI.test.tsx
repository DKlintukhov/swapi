
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { useGetFilmQuery, useGetPageQuery, useGetPersonQuery, useGetPlanetQuery, useGetSpeciesQuery, useGetStarshipQuery, useGetVehicleQuery, } from './swAPI';
import { Film, Page, Person, Planet, Species, Starship, Vehicle } from '../../data-models';
import { act, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '..';
import { pageMock, pageResponseMock } from '../../data-models/Page.test';
import { starshipMock, starshipResponseMock } from '../../data-models/Starship.test';
import { personMock } from '../../data-models/Person.test';
import { filmMock, filmResponseMock } from '../../data-models/Film.test';
import { speciesMock, speciesResponseMock } from '../../data-models/Species.test';
import { vehicleMock, vehicleResponseMock } from '../../data-models/Vehicle.test';
import { planetMock, planetResponseMock } from '../../data-models/Planet.test';

const server = setupServer(
  rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
    return res(ctx.json(pageResponseMock));
  }),
  rest.get('https://swapi.dev/api/starhips/1/', (req, res, ctx) => {
    return res(ctx.json(starshipResponseMock));
  }),
  rest.get('https://swapi.dev/api/planets/1/', (req, res, ctx) => {
    return res(ctx.json(planetResponseMock));
  }),
  rest.get('https://swapi.dev/api/films/1/', (req, res, ctx) => {
    return res(ctx.json(filmResponseMock));
  }),
  rest.get('https://swapi.dev/api/species/1/', (req, res, ctx) => {
    return res(ctx.json(speciesResponseMock));
  }),
  rest.get('https://swapi.dev/api/vehicles/1/', (req, res, ctx) => {
    return res(ctx.json(vehicleResponseMock));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('swAPI', () => {
  const wrapper = ({ children }: { children: React.ReactElement }) => (<Provider store={store}> {children}</Provider>);

  describe('getPage', () => {
    it('should return the page data', async () => {
      const { result } = renderHook(() => useGetPageQuery(1), { wrapper });
      await act(() => result.current.refetch());
      const data: Page = result.current.data!;
      expect(data.total).toBe(pageMock.total);
      expect(data.people).toEqual([personMock]);
    });
  });

  describe('getPerson', () => {
    it('should return the first person matching the search', async () => {
      const { result } = renderHook(() => useGetPersonQuery('Luke'), { wrapper });
      await act(() => result.current.refetch());
      const person: Person = result.current.data!;
      expect(person.name).toBe(personMock.name);
      expect(person.url).toBe(personMock.url);
    });
  });

  describe('getPlanet', () => {
    it('should return the planet with the specified number', async () => {
      const { result } = renderHook(() => useGetPlanetQuery(1), { wrapper });
      await act(() => result.current.refetch());
      const planet: Planet = result.current.data!;
      expect(planet.name).toBe(planetMock.name);
      expect(planet.url).toBe(planetMock.url);
    });
  });

  describe('getStarship', () => {
    it('should return the starship with the specified number', async () => {
      const { result } = renderHook(() => useGetStarshipQuery(1), { wrapper });
      await act(() => result.current.refetch());
      const starship: Starship = result.current.data!;
      expect(starship.name).toBe(starshipMock.name);
      expect(starship.url).toBe(starshipMock.url);
    });
  });

  describe('getFilm', () => {
    it('should return the film with the specified number', async () => {
      const { result } = renderHook(() => useGetFilmQuery(1), { wrapper });
      await act(() => result.current.refetch());
      const film: Film = result.current.data!;
      expect(film.title).toBe(filmMock.title);
      expect(film.url).toBe(filmMock.url);
    });
  });

  describe('getSpecies', () => {
    it('should return the species with the specified number', async () => {
      const { result } = renderHook(() => useGetSpeciesQuery(1), { wrapper });
      await act(() => result.current.refetch());
      const species: Species = result.current.data!;
      expect(species.name).toBe(speciesMock.name);
      expect(species.url).toBe(speciesMock.url);
    });
  });

  describe('getVehicle', () => {
    it('should return the vehicles with the specified number', async () => {
      const { result } = renderHook(() => useGetVehicleQuery(1), { wrapper });
      await act(() => result.current.refetch());
      const vehicle: Vehicle = result.current.data!;
      expect(vehicle.name).toBe(vehicleMock.name);
      expect(vehicle.url).toBe(vehicleMock.url);
    });
  });
});
