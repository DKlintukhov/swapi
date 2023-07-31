import { fireEvent, render, screen, waitFor, } from '@testing-library/react';
import { Person } from '../../data-models';
import { PeopleMenu } from '..';
import { Provider } from 'react-redux';
import { personMock } from '../../data-models/Person.test';
import { addCurrentPage, addPeople, cleanSaved, savePerson, store } from '../../store';
import { act } from 'react-dom/test-utils';

describe('PeopleMenu', () => {
  const mockOnPersonSelect = jest.fn();
  localStorage.clear();

  beforeEach(() => {
    jest.resetAllMocks();
    render(<Provider store={store}><PeopleMenu onPersonSelect={mockOnPersonSelect} /></Provider>);
  });

  afterEach(() => {
    act(() => {
      store.dispatch(addPeople([]));
      store.dispatch(addCurrentPage([]));
      store.dispatch(cleanSaved());
      localStorage.clear();
    });
  });

  it('renders filters people based on search query', async () => {
    act(() => {
      store.dispatch(addPeople([personMock]));
      store.dispatch(addCurrentPage([personMock]));
      const inputElement = screen.getByLabelText('Search...');
      fireEvent.change(inputElement, personMock.name);
      expect(inputElement).toBeInTheDocument();
      fireEvent.change(inputElement, personMock.name);
    });

    await waitFor(() => {
      expect(screen.getByText(personMock.name)).toBeInTheDocument();
      expect(screen.getByText(`Birth Year: ${personMock.birthYear}`)).toBeInTheDocument();
    });
  });

  it('renders filtered people list when data is fetched successfully', async () => {
    const toSave = { ...personMock, name: 'Luke Skywalker', birthYear: 'another data' };

    const mockPeopleOnPage: Person[] = [
      { ...personMock, name: 'Luke Skywalker', birthYear: '19BBY' },
      { ...personMock, name: 'Leia Organa', birthYear: '19BBY', url: 'url2' },
    ];
    const mockSavedPeople: Person[] = [
      { ...personMock, name: 'Luke Skywalker', birthYear: 'another data' },
      { ...personMock, name: 'Han Solo', birthYear: '29BBY', url: 'url3' },
    ];

    act(() => {
      store.dispatch(savePerson(toSave));
      store.dispatch(addCurrentPage(mockPeopleOnPage));
      store.dispatch(addPeople(mockSavedPeople));
    });

    const inputElement = screen.getByLabelText('Search...');
    fireEvent.change(inputElement, 'l');

    await waitFor(() => {
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
      expect(screen.queryByText('Luke Skywalker')).toBeInTheDocument();
      expect(screen.queryByText('Birth Year: another data')).toBeInTheDocument();
      expect(screen.queryByText('Leia Organa')).toBeInTheDocument();
      expect(screen.queryByText('Birth Year: 29BBY')).not.toBeInTheDocument();
    });
  });

  it('calls onPersonSelect when a person is selected', async () => {
    act(() => {
      store.dispatch(addPeople([personMock]));
      store.dispatch(addCurrentPage([personMock]));
      
    });
    fireEvent.click(screen.getByText(personMock.name));
    await waitFor(() => {
      expect(mockOnPersonSelect).toHaveBeenCalledWith(personMock);
    });
  });
});
