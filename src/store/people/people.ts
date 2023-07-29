import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Person } from '../../data-models';

interface PeopleState {
  all: Person[];
  saved: Person[];
}

export const initialState: PeopleState = {
  all: [],
  saved: [],
};

export const people = createSlice({
  name: 'people',
  initialState,
  reducers: {
    setPeople: (state, { payload }: PayloadAction<Person[]>) => {
      state.all = payload.map((person) => {
        const rawPerson = localStorage.getItem(person.url);
        if (rawPerson) {
          return JSON.parse(rawPerson);
        }
        return person;
      });
    },
    savePerson: (state, { payload }: PayloadAction<Person>) => {
      const rawPerson = localStorage.getItem(payload.url);
      const foundIdx = state.all.findIndex((el) => el.url === payload.url);
      const idx = foundIdx === -1 ? 0 : foundIdx;
      if (!rawPerson) {
        localStorage.setItem(payload.url, JSON.stringify(payload));
        state.all[idx] = payload;
      } else {
        localStorage.setItem(payload.url, JSON.stringify(payload));
        state.all[idx] = payload;
      }
    },
    deletePerson: (state, { payload }: PayloadAction<Person>) => {
      localStorage.removeItem(payload.url);
    },
  },
});
