import { render, screen, fireEvent } from '@testing-library/react';
import { PeopleSearchDropdown } from './PeopleSearchDropdown';
import { personMock } from '../../data-models/Person.test';

const people = [personMock];

describe('PeopleSearchDropdown', () => {
  it('renders search input and loading indicator', () => {
    render(
      <PeopleSearchDropdown
        people={people}
        isLoading={true}
        onSearch={jest.fn()}
        onSelect={jest.fn()}
      />
    );

    const searchInput = screen.getByLabelText('Search...');
    const loadingIndicator = screen.getByRole('progressbar');

    expect(searchInput).toBeInTheDocument();
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('calls onSearch with search query on input change', () => {
    const onSearch = jest.fn();
    render(
      <PeopleSearchDropdown
        people={people}
        isLoading={false}
        onSearch={onSearch}
        onSelect={jest.fn()}
      />
    );

    const searchInput = screen.getByLabelText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(onSearch).toHaveBeenCalledWith('John');
  });

  it('calls onSelect with selected person on option change', () => {
    const onSelect = jest.fn();
    render(
      <PeopleSearchDropdown
        people={people}
        isLoading={false}
        onSearch={jest.fn()}
        onSelect={onSelect}
      />
    );

    const searchInput = screen.getByLabelText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    const option = screen.getByText('John Doe');
    fireEvent.click(option);

    expect(onSelect).toHaveBeenCalledWith(personMock);
  });
});
