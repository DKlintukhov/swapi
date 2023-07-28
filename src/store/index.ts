import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { swAPI } from './swAPI/swAPI';
import { Person } from '../data-models';

export interface State {
  person: Person | null;
  page: number;
  people: Person[];
}

const initialState: State = {
  person: null,
  page: 1,
  people: [],
}

export const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    setPerson: (state, { payload }: PayloadAction<Person>) => {
      state.person = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
    setPeople: (state, { payload }: PayloadAction<Person[]>) => {
      state.people = payload;
    }
  },
})

export const store = configureStore({
  reducer: {
    [swAPI.reducerPath]: swAPI.reducer,
    [root.name]: root.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const { setPerson, setPage, setPeople } = root.actions;