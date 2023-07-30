import { personMock } from '../../data-models/Person.test';
import { initialState, ui } from './ui';

describe('ui slice', () => {
  it('should handle setPerson', () => {
    const action = { type: 'ui/setPerson', payload: personMock };
    const newState = ui.reducer(initialState, action);
    expect(newState.person).toEqual(personMock);
  });

  it('should handle setPage', () => {
    const action = { type: 'ui/setPage', payload: 2 };
    const newState = ui.reducer(initialState, action);
    expect(newState.page).toEqual(2);
  });
});
