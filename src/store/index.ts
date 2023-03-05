import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import clinicsReducer from "./reducers/clinicsReducer";

const rootReducer = combineReducers({
    clinics: clinicsReducer
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;

