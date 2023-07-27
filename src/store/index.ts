import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { swAPI } from './swAPI/swAPI';
import { Person } from '../data-models';

export interface State {
  person: Person | null;
  page: number;
}

const initialState: State = {
  person: null,
  page: 1,
}

export const root = createSlice({
  name: 'root',
  initialState,
  reducers: {
    selectPerson: (state, { payload }: PayloadAction<Person>) => {
      state.person = payload;
    },
    selectPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
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
export const { selectPerson, selectPage } = root.actions;