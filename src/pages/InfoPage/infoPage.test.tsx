import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { InfoPage } from './InfoPage';
import { setPerson, store } from '../../store';
import { personMock } from '../../data-models/Person.test';
import { Person } from '../../data-models';

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigator,
}));

describe('InfoPage', () => {
  it('renders the person card with the correct person data', () => {
    store.dispatch(setPerson(personMock));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <InfoPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(personMock.name)).toBeInTheDocument();
  });

  it('should navigate to the HomePage if no person selected', () => {
    store.dispatch(setPerson(null as unknown as Person));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <InfoPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText(personMock.name)).not.toBeInTheDocument();
    expect(mockedNavigator).toHaveBeenCalledWith('/');
  });
});
