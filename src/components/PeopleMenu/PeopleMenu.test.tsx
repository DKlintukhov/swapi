import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { PeopleMenu } from './PeopleMenu';
import { Person } from '../../data-models';
import { personMock } from '../../data-models/Person.test';

const mockPeople: Person[] = [personMock];

describe('PeopleMenu', () => {
  it('should render the list of people', () => {
    render(
      <MemoryRouter>
        <PeopleMenu people={mockPeople} onPersonSelect={() => {}}/>
      </MemoryRouter>
    );

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(mockPeople.length);

    listItems.forEach((listItem, index) => {
      const person = mockPeople[index];
      const personName = screen.getByText(person.name);
      const personBirthYear = screen.getByText(`Birth Year: ${person.birthYear}`);
      expect(personName).toBeInTheDocument();
      expect(personBirthYear).toBeInTheDocument();
      expect(listItem).toContainElement(personName);
      expect(listItem).toContainElement(personBirthYear);
    });
  });
});
