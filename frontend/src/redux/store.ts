import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: userReducer
})

const persistedReducer: any = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export default store;