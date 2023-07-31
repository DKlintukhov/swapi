import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { PersonCard } from './PersonCard';
import { store } from '../../store';
import { personMock } from '../../data-models/Person.test';
import { act } from 'react-dom/test-utils';

describe('PersonCard', () => {
  localStorage.clear();

  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PersonCard person={personMock} />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the PersonForm component with correct data', () => {
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getByLabelText('Name:')).toHaveValue(personMock.name);
    expect(screen.getByLabelText('Gender:')).toHaveValue(personMock.gender);
  });

  it('dispatches savePerson and setPerson actions on form submission', async () => {
    act(() => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(store.getState().people.all).toEqual({ [personMock.url]: personMock });
      expect(store.getState().people.saved).toEqual({ [personMock.url]: personMock });
      expect(JSON.parse(localStorage.getItem(personMock.url) as string)).toEqual(personMock);
    });
  });

  it('dispatches deletePerson action and navigates to home on delete button click', async () => {
    act(() => {
      fireEvent.submit(screen.getByRole('form'));
    });

    await waitFor(() => {
      expect(store.getState().people.all).toEqual({ [personMock.url]: personMock });
      expect(store.getState().people.saved).toEqual({ [personMock.url]: personMock });
      expect(JSON.parse(localStorage.getItem(personMock.url) as string)).toEqual(personMock);
    });

    act(() => {
      fireEvent.click(screen.getByRole('delete'));
    });

    await waitFor(() => {
      expect(store.getState().people.all).toEqual({});
      expect(store.getState().people.saved).toEqual({});
      expect(localStorage.getItem(personMock.url)).toEqual(null);
    });
  });
});
