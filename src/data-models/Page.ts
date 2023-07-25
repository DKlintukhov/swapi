import { Person, PersonResponse } from '.';

export interface PageResponse {
  count: number;
  next: number | null;
  previous: string;
  results: PersonResponse[];
}

export interface Page {
  count: number;
  next: number | null;
  previous: string;
  results: Person[];
}
