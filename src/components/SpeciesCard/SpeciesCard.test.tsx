import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CardProps, Species } from '../../data-models';
import { SpeciesCard } from '..';
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { act } from 'react-dom/test-utils';
import { speciesMock, speciesResponseMock } from '../../data-models/Species.test';

const server = setupServer(
  rest.get('https://swapi.dev/api/species/0/', (req, res, ctx) => {
    return res(ctx.json(speciesResponseMock));
  }),
  rest.get('https://swapi.dev/api/species/100/', (req, res, ctx) => {
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

describe('SpeciesCard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders loading spinner while fetching species', () => {
    const props: CardProps<Species> = {
      proxy: { id: '0', child: null, url: speciesMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><SpeciesCard {...props} /></Provider>);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('renders species form when species is fetched successfully', () => {
    const props: CardProps<Species> = {
      proxy: { id: '0', child: speciesMock, url: speciesMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><SpeciesCard {...props} /></Provider>);

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong...')).not.toBeInTheDocument();
  });

  it('renders error message when film fetch fails', async () => {
    const props: CardProps<Species> = {
      proxy: { id: '100', child: null, url: 'https://link/100/' },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><SpeciesCard {...props} /></Provider>);

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.queryByRole('form')).not.toBeInTheDocument();
      expect(screen.getByText('Something went wrong...')).toBeInTheDocument();
      expect(screen.queryByRole('retry')).toBeInTheDocument();
    });
  });

  it('calls onSave with updated species when saved', async () => {
    const props: CardProps<Species> = {
      proxy: { id: '0', child: speciesMock, url: speciesMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><SpeciesCard {...props} /></Provider>);

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
      child: { ...speciesMock, name: newName },
    });
  });

  it('calls onSave with null child when deleted', async () => {
    const props: CardProps<Species> = {
      proxy: { id: '0', child: speciesMock, url: speciesMock.url },
      onSave: jest.fn(),
    };

    render(<Provider store={store}><SpeciesCard {...props} /></Provider>);

    await act(() => {
      expect(screen.getByRole('form')).toBeInTheDocument();
      const deleteButton = screen.getByRole('delete');
      fireEvent.click(deleteButton);
    });

    expect(props.onSave).toHaveBeenCalledWith({ id: '0', child: null, url: speciesMock.url });
  });
});
