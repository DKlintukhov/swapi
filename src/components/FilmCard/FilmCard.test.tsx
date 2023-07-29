import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CardProps, Film } from '../../data-models';
import { FilmCard } from '..';
import { filmMock, filmResponseMock } from '../../data-models/Film.test';
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { act } from 'react-dom/test-utils';

const server = setupServer(
  rest.get('https://swapi.dev/api/films/0/', (req, res, ctx) => {
    return res(ctx.json(filmResponseMock));
  }),
  rest.get('https://swapi.dev/api/films/100/', (req, res, ctx) => {
    return res(
      ctx.status(403),
      ctx.json({
        errorMessage: `Doesn't exist`,
      }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('FilmCard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading spinner while fetching film', () => {
    const props: CardProps<Film> = {
      proxy: { id: '0', child: null, url: filmMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><FilmCard {...props} /></Provider>);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('renders film form when film is fetched successfully', () => {
    const props: CardProps<Film> = {
      proxy: { id: '0', child: filmMock, url: filmMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><FilmCard {...props} /></Provider>);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('renders error message when film fetch fails', async () => {
    const props: CardProps<Film> = {
      proxy: { id: '100', child: null, url: 'https://link/100/' },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><FilmCard {...props} /></Provider>);

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
      expect(screen.queryByRole('retry')).toBeInTheDocument();
    });
  });

  it('calls onSave with updated film when saved', async () => {
    const props: CardProps<Film> = {
      proxy: { id: '0', child: filmMock, url: filmMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><FilmCard {...props} /></Provider>);

    const newTitle = 'New title';
    await act(() => {
      const form = screen.getByRole('form');
      const titleInput = screen.getByLabelText('Title:');
      expect(form).toBeInTheDocument();
      fireEvent.change(titleInput, { target: { value: newTitle } });
      fireEvent.submit(form);
    });

    expect(props.onSave).toHaveBeenCalledWith({
      ...props.proxy,
      child: { ...filmMock, title: newTitle },
    });
  });

  it('calls onSave with null child when deleted', async () => {
    const props: CardProps<Film> = {
      proxy: { id: '0', child: filmMock, url: filmMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><FilmCard {...props} /></Provider>);

    await act(() => {
      expect(screen.getByRole('form')).toBeInTheDocument();
      const deleteButton = screen.getByRole('delete');
      fireEvent.click(deleteButton);
    });

    expect(props.onSave).toHaveBeenCalledWith({ id: '0', child: null, url: filmMock.url });
  });
});
