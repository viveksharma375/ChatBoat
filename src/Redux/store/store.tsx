import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';

import userReucer from "../slices/userslice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user:userReucer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false, }),
});

const persistor = persistStore(store);

export { store, persistor };