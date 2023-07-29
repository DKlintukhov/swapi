import { configureStore } from '@reduxjs/toolkit';
import { swAPI } from './swAPI/swAPI';
import { ui } from './ui/ui';
import { people } from './people/people';

export const store = configureStore({
  reducer: {
    [swAPI.reducerPath]: swAPI.reducer,
    [people.name]: people.reducer,
    [ui.name]: ui.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(swAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const { setPerson, setPage } = ui.actions;
export const { setPeople, savePerson, deletePerson } = people.actions;
