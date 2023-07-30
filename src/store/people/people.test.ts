import { Person } from '../../data-models';
import { personMock } from '../../data-models/Person.test';
import { people, initialState } from './people';
import { starshipMock } from '../../data-models/Starship.test';

describe('ui slice', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should handle setPeople', () => {
    const savedPerson: Person = { ...personMock, name: 'Saved', starships: [{ url: starshipMock.url, child: starshipMock, id: '1' }] };
    localStorage.setItem(savedPerson.url, JSON.stringify(savedPerson));
    const action = { type: 'people/setPeople', payload: [personMock] };
    const newState = people.reducer(initialState, action);
    expect(newState.all).toEqual([savedPerson]);
  });

  it('should handle savePerson', () => {
    people.reducer(initialState, { type: 'people/setPeople', payload: [personMock] });
    localStorage.setItem(personMock.url, JSON.stringify(personMock));
    const newPerson = { ...personMock, name: 'New Name' };
    const action = { type: 'people/savePerson', payload: newPerson };
    const newState = people.reducer(initialState, action);
    expect(newState.all).toEqual([newPerson]);
    expect(JSON.parse(localStorage.getItem(personMock.url)!)).toEqual(newPerson);
  });
});
