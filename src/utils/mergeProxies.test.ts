import { filmMock } from '../data-models/Film.test';
import { personMock } from '../data-models/Person.test';
import { mergeProxies } from './mergeProxies';

describe('mergeProxies', () => {
  const newFilm = {
    ...filmMock,
    url: personMock.films[0].url,
  }
  const res = mergeProxies(personMock.films, newFilm);
  expect(res).toEqual([{ id: '0', child: newFilm, url: newFilm.url }, personMock.films[1]]);
});
