import { Film, FilmResponse, transformFilmResponse } from '.';

export const filmResponseMock: FilmResponse = {
  characters: ['https://link/0/', 'https://link/1/'],
  created: '2022-01-01',
  director: 'Director',
  edited: '2022-01-02',
  episode_id: 1,
  opening_crawl: 'Opening crawl',
  planets: ['https://link/0/', 'https://link/1/'],
  producer: 'Producer',
  release_date: '2022-01-03',
  species: ['https://link/0/', 'https://link/1/'],
  starships: ['https://link/0/', 'https://link/1/'],
  title: 'Film Title',
  url: 'https://link/0/',
  vehicles: ['https://link/0/', 'https://link/1/'],
};
export const filmMock: Film = {
  characters: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  director: 'Director',
  episodeId: 1,
  openingCrawl: 'Opening crawl',
  planets: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  producer: 'Producer',
  releaseDate: '2022-01-03',
  species: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  starships: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
  title: 'Film Title',
  url: 'https://link/0/',
  vehicles: [
    { url: 'https://link/0/', child: null, id: '0', },
    { url: 'https://link/1/', child: null, id: '1', },
  ],
};

it('should transform FilmResponse to Film', () => {
  const transformedFilm = transformFilmResponse(filmResponseMock);
  expect(transformedFilm).toEqual(filmMock);
});
