import { Page, PageResponse, transformPageResponse } from '.';
import { personMock, personResponseMock } from './Person.test';

export const pageResponseMock: PageResponse = {
  count: 10,
  next: 'next_page',
  previous: 'previous_page',
  results: [personResponseMock],
};

export const pageMock: Page = {
  total: 10,
  next: 'next_page',
  previous: 'previous_page',
  people: [personMock],
};

it('should transform PageResponse to Page', () => {
  const transformedPage = transformPageResponse(pageResponseMock);
  expect(transformedPage).toEqual(pageMock);
});
