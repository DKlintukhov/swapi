import { filmMock } from '../data-models/Film.test';
import { personMock } from '../data-models/Person.test';
import { mergeProxies } from './mergeProxies';

describe('mergeProxies', () => {
  const newFilm = { id: '0', child: filmMock, url: filmMock.url }
  const res = mergeProxies(personMock.films, newFilm);
  expect(res).toEqual([newFilm, personMock.films[1]]);
});
