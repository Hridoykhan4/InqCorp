
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use localStorage
import HvacStoreSlice from "./hvac"
import {persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER,} from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    hvac: HvacStoreSlice
})

const persistreducer=persistReducer(persistConfig,rootReducer)

export const store = configureStore({
   reducer:persistreducer,
   middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  ],

});

export const persistor = persistStore(store)
