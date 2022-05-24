import { configureStore } from "@reduxjs/toolkit";
import detectedObjects from "./detectedObjects";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  detectedObjects: detectedObjects,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;

/*
export const store = configureStore({
  reducer: {
    //combine all reducers
    detectedObjects: detectedObjects,
  },
});*/
