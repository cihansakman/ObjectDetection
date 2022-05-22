import { createSlice } from "@reduxjs/toolkit";

const detectedObjectSlice = createSlice({
  name: "detectedObjects",
  initialState: {
    objects: [],
  },

  reducers: {
    addDetectedObject: (state, action) => {
      state.objects.push(action.payload.name);
    },
    resetObjects: (state) => {
      state.objects.splice(0, state.objects.length);
    },
  },
});

//First export the actions
export const addDetectedObject = detectedObjectSlice.actions.addDetectedObject;
export const resetObjects = detectedObjectSlice.actions.resetObjects;
//export reducer of slice
export default detectedObjectSlice.reducer;
