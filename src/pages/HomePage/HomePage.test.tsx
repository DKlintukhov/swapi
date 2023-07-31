import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { store } from '../../store';
import { rest } from 'msw';
import { setupServer } from 'msw/lib/node';
import { pageResponseMock } from '../../data-models/Page.test';
import { personMock } from '../../data-models/Person.test';

describe('HomePage', () => {
  it('renders loading spinner when isLoading is true', () => {
    const server = setupServer(
      rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
        return res(ctx.json(pageResponseMock));
      }),
    );
    server.listen();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    server.close();
  });

  it('renders error message when error is not null', async () => {
    const server = setupServer(
      rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
        return res(ctx.status(403), ctx.json({ error: 'error' }));
      }),
    );
    server.listen();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    setTimeout(() => {
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
      expect(screen.getByRole('retry')).toBeInTheDocument();
    })

    server.close();
  });

  it('dispatches setPage, addPeople, and addCurrentPage actions when page data is available', () => {
    const server = setupServer(
      rest.get('https://swapi.dev/api/people/', (req, res, ctx) => {
        return res(ctx.json(pageResponseMock));
      }),
    );
    server.listen();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );

    setTimeout(() => {
      expect(store.getState().people.currentPage).toEqual([personMock]);
      expect(store.getState().ui.page).toEqual(1);
      expect(store.getState().ui.person).toEqual(personMock);
    });

    server.close();
  });
});
