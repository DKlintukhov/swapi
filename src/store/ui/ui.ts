import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Person } from '../../data-models';

export interface UIState {
  person: Person | null;
  page: number;
}

export const initialState: UIState = {
  person: null,
  page: 1,
};

export const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setPerson: (state, { payload }: PayloadAction<Person>) => {
      state.person = payload;
    },
    setPage: (state, { payload }: PayloadAction<number>) => {
      state.page = payload;
    },
  },
});
