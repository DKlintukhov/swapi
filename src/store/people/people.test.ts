import { personMock } from '../../data-models/Person.test';
import { people, initialState } from './people';

describe('people slice', () => {
  localStorage.clear();

  afterEach(() => {
    localStorage.clear();
  });

  it('should handle savePerson', () => {
    const action = { type: 'people/savePerson', payload: personMock };
    const newState = people.reducer(initialState, action);
    expect(newState.all).toEqual({ [personMock.url]: personMock });
    expect(newState.saved).toEqual({ [personMock.url]: personMock });
    const res = JSON.parse(localStorage.getItem(personMock.url) as string);
    expect(res).toEqual(personMock);
  });

  it('should handle deletePerson', () => {
    let state = people.reducer(initialState, { type: 'people/savePerson', payload: personMock });
    expect(state.all).toEqual({ [personMock.url]: personMock });
    expect(state.saved).toEqual({ [personMock.url]: personMock });
    const res = JSON.parse(localStorage.getItem(personMock.url) as string);
    expect(res).toEqual(personMock);
    const action = { type: 'people/deletePerson', payload: personMock };
    state = people.reducer(state, action);
    expect(state.all).toEqual({});
    expect(state.saved).toEqual({});
    expect(localStorage.getItem(personMock.url)).toBe(null);
  });

  it('should handle addCurrentPage', () => {
    const toSave = { ...personMock, name: 'Another name' };
    let state = people.reducer(initialState, { type: 'people/savePerson', payload: toSave });
    state = people.reducer(state, { type: 'people/addCurrentPage', payload: [personMock] });
    expect(state.all).toEqual({ [toSave.url]: toSave });
    expect(state.saved).toEqual({ [toSave.url]: toSave });
    expect(state.currentPage).toEqual([toSave]);
  });
});
