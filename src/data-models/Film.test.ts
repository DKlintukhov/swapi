import { Film, FilmResponse, transformFilmResponse } from '.';

export const filmResponseMock: FilmResponse = {
    characters: ['character1', 'character2'],
    created: '2022-01-01',
    director: 'Director',
    edited: '2022-01-02',
    episode_id: 1,
    opening_crawl: 'Opening crawl',
    planets: ['planet1', 'planet2'],
    producer: 'Producer',
    release_date: '2022-01-03',
    species: ['species1', 'species2'],
    starships: ['starship1', 'starship2'],
    title: 'Film Title',
    url: 'film-url',
    vehicles: ['vehicle1', 'vehicle2'],
};
export const filmMock: Film = {
    characters: [
        { url: 'character1', child: null },
        { url: 'character2', child: null },
    ],
    director: 'Director',
    episodeId: 1,
    openingCrawl: 'Opening crawl',
    planets: [
        { url: 'planet1', child: null },
        { url: 'planet2', child: null },
    ],
    producer: 'Producer',
    releaseDate: '2022-01-03',
    species: [
        { url: 'species1', child: null },
        { url: 'species2', child: null },
    ],
    starships: [
        { url: 'starship1', child: null },
        { url: 'starship2', child: null },
    ],
    title: 'Film Title',
    url: 'film-url',
    vehicles: [
        { url: 'vehicle1', child: null },
        { url: 'vehicle2', child: null },
    ],
};

test('should transform FilmResponse to Film', () => {
    const transformedFilm = transformFilmResponse(filmResponseMock);
    expect(transformedFilm).toEqual(filmMock);
});
