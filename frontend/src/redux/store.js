import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default storage is localStorage for web
import authSlice from "./auth";
import companySlice from "./companySlice";
import applicantSlice from "./applicationSlice";
import jobSlice from "./jobSlice";

// Combine all reducers into one root reducer
const rootReducer = combineReducers({
    auth: authSlice.reducer,
    company: companySlice.reducer,
    application: applicantSlice.reducer,
    job: jobSlice.reducer,
});

// Configure persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Wrap the combined rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
