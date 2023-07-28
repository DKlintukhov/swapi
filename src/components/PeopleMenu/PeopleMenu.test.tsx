import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { PeopleMenu } from './PeopleMenu';
import { Person } from '../../data-models';
import { personMock } from '../../data-models/Person.test';
import { Provider } from 'react-redux';
import { store } from '../../store';

const mockPeople: Person[] = [personMock];

describe('PeopleMenu', () => {
  const onPersonSelect = jest.fn();

  beforeEach(() => {
    render(<Provider store={store}><PeopleMenu people={mockPeople} onPersonSelect={jest.fn()} /></Provider>);
  });

  it('renders input field and dropdown', () => {
    const inputElement = screen.getByLabelText('Search...');
    const personName = screen.getByText(personMock.name);
    const birthYear = screen.getByText(`Birth Year: ${personMock.birthYear}`);

    expect(inputElement).toBeInTheDocument();
    expect(personName).toBeInTheDocument();
    expect(birthYear).toBeInTheDocument();
  });

  it('filters people based on search query', () => {
    const inputElement = screen.getByLabelText('Search...');
    fireEvent.change(inputElement, personMock.name);

    const filteredPerson = screen.getByText(personMock.name);
    const notFilteredPerson = screen.queryByText('Jane Smith');

    expect(filteredPerson).toBeInTheDocument();
    expect(notFilteredPerson).not.toBeInTheDocument();
  });

  it('calls onPersonSelect when a person is selected', async () => {
    const selected = screen.getByRole('button');
    fireEvent.click(selected);
    setTimeout(() => expect(onPersonSelect).toHaveBeenCalledWith(personMock));
  });
});
