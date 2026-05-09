import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../feature/auth/auth.slice.js';
import doctorReducer from '../feature/doctors/doctors.slice.js';
import patientReducer from '../feature/patients/patients.slice.js';
import admissionReducer from '../feature/admissions/admissions.slice.js';
import bedReducer from '../feature/beds/beds.slice.js';
import wardReducer from '../feature/wards/wards.slice.js';
import roomReducer from '../feature/rooms/rooms.slice.js';
import storage from 'redux-persist/es/storage';

import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,

    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    doctors: doctorReducer,
    patients: patientReducer,
    admissions: admissionReducer,
    beds: bedReducer,
    wards: wardReducer,
    rooms: roomReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
