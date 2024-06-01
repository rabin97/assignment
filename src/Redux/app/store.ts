import { configureStore } from "@reduxjs/toolkit";

import ThemeReducers from "../slices/ThemeSlice";
import userReducer from "../slices/userSlice";

import storage from "redux-persist/lib/storage";
import {
    persistReducer,
    persistStore,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";

const PersistsConfig = {
    key: 'theme',
    storage
}
const PersistsConfigForUser = {
    key: 'user',
    storage
}

const persistedThemeReducer = persistReducer(PersistsConfig, ThemeReducers)
const persistedUserReducer = persistReducer(PersistsConfigForUser, userReducer)

const store = configureStore({
    reducer: {
        theme: persistedThemeReducer,
        users: persistedUserReducer
    }
})

const persistor = persistStore(store)


export default store;
setupListeners(store.dispatch)

export { persistor };
export type AppDispatch = typeof store.dispatch;
export const appDispatch = store.dispatch;
export type RootState = ReturnType<typeof store.getState>;