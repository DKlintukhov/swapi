import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
import { swAPI } from './swAPI/swAPI';
import { Person } from '../data-models';

export interface SelectedPersonState {
  person: Person | null;
}

const initialState: SelectedPersonState = {
  person: null,
}

export const selectedPersonSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    selectPerson: (state, action: PayloadAction<Person>) => {
      state.person = action.payload;
    }
  },
})

export const store = configureStore({
  reducer: {
    [swAPI.reducerPath]: swAPI.reducer,
    [selectedPersonSlice.name]: selectedPersonSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const { selectPerson } = selectedPersonSlice.actions;