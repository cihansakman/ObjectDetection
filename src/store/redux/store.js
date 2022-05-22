import { configureStore } from "@reduxjs/toolkit";
import detectedObjects from "./detectedObjects";
export const store = configureStore({
  reducer: {
    //combine all reducers
    detectedObjects: detectedObjects,
  },
});
