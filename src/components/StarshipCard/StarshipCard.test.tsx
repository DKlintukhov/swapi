import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CardProps, Starship } from '../../data-models';
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { act } from 'react-dom/test-utils';
import { starshipMock, starshipResponseMock } from '../../data-models/Starship.test';
import { StarshipCard } from './StarshipCard';


const server = setupServer(
  rest.get('https://swapi.dev/api/starships/0/', (req, res, ctx) => {
    return res(ctx.json(starshipResponseMock));
  }),
  rest.get('https://swapi.dev/api/starships/100/', (req, res, ctx) => {
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

describe('StarshipCard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading spinner while fetching starship', () => {
    const props: CardProps<Starship> = {
      proxy: { id: '0', child: null, url: starshipMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><StarshipCard {...props} /></Provider>);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('renders starship form when starship is fetched successfully', () => {
    const props: CardProps<Starship> = {
      proxy: { id: '0', child: starshipMock, url: starshipMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><StarshipCard {...props} /></Provider>);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('renders error message when starship fetch fails', async () => {
    const props: CardProps<Starship> = {
      proxy: { id: '100', child: null, url: 'https://link/100/' },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><StarshipCard {...props} /></Provider>);

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
      expect(screen.queryByRole('retry')).toBeInTheDocument();
    });
  });

  it('calls onSave with updated starship when saved', async () => {
    const props: CardProps<Starship> = {
      proxy: { id: '0', child: starshipMock, url: starshipMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><StarshipCard {...props} /></Provider>);

    const newName = 'New name';
    await act(() => {
      const form = screen.getByRole('form');
      const titleInput = screen.getByLabelText('Name:');
      expect(form).toBeInTheDocument();
      fireEvent.change(titleInput, { target: { value: newName } });
      fireEvent.submit(form);
    });

    expect(props.onSave).toHaveBeenCalledWith({
      ...props.proxy,
      child: { ...starshipMock, name: newName },
    });
  });

  it('calls onSave with null child when deleted', async () => {
    const props: CardProps<Starship> = {
      proxy: { id: '0', child: starshipMock, url: starshipMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><StarshipCard {...props} /></Provider>);

    await act(() => {
      expect(screen.getByRole('form')).toBeInTheDocument();
      const deleteButton = screen.getByRole('delete');
      fireEvent.click(deleteButton);
    });

    expect(props.onSave).toHaveBeenCalledWith({ id: '0', child: null, url: starshipMock.url });
  });
});
