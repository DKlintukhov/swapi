import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Person } from '../../data-models';

interface PeopleState {
  cache: Record<string, Person>;
  all: Record<string, Person>;
  saved: Record<string, Person>;
  currentPage: Person[];
}

export const initialState: PeopleState = {
  cache: {},
  all: {},
  currentPage: [],
  saved: Object.entries(localStorage).reduce<Record<string, Person>>((prev, [key, value]) => {
    prev[key] = JSON.parse(value);
    return prev;
  }, {}),
};

export const people = createSlice({
  name: 'people',
  initialState,
  reducers: {
    addPeople: (state, { payload }: PayloadAction<Person[]>) => {
      const newPeople = payload.reduce<Record<string, Person>>((prev, person) => {
        prev[person.url] = person;
        return prev;
      }, {});
      state.cache = {
        ...state.cache,
        ...newPeople,
      }
      state.all = {
        ...newPeople,
        ...state.saved,
      }
    },
    savePerson: (state, { payload }: PayloadAction<Person>) => {
      localStorage.setItem(payload.url, JSON.stringify(payload));
      state.saved[payload.url] = payload;
      state.all[payload.url] = payload;
    },
    deletePerson: (state, { payload }: PayloadAction<Person>) => {
      localStorage.removeItem(payload.url);
      delete state.saved[payload.url];
      state.all[payload.url] = state.cache[payload.url];
    },
    addCurrentPage: (state, { payload }: PayloadAction<Person[]>) => {
      state.currentPage = payload.map((person) => {
        const saved = state.saved[person.url];
        if (saved) {
          return saved;
        }
        return person;
      });
    },
    cleanSaved: (state, _: PayloadAction<void>) => {
      state.saved = {};
    }
  },
});
