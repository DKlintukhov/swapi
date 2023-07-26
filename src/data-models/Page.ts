import { Person, PersonResponse, transformPersonResponse } from '.';

export interface PageResponse {
  count: number;
  next: string | null;
  previous: string;
  results: PersonResponse[];
}

export interface Page {
  total: number;
  next: string | null;
  previous: string;
  people: Person[];
}

export const transformPageResponse = (resp: PageResponse): Page => ({
  total: resp.count,
  next: resp.next,
  previous: resp.previous,
  people: resp.results.map(transformPersonResponse),
});
