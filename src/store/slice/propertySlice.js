import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

export const PropertyDetails = createAsyncThunk("propertiesDetails", async ({ property_id }, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.PropertyDetailsApi({ property_id });
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

const initialState = {
  propertiesDetails: {
    data: {},
    error: null,
  },
};

const propertyDeatailsSlice = createSlice({
  name: "Property",
  initialState,
  reducers: {
    setProperties: (state) => {
      state.properties.data = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(PropertyDetails.fulfilled, (state, action) => {
        state.propertiesDetails.data = action.payload.data;
      })
      .addCase(PropertyDetails.rejected, (state, action) => {
        state.propertiesDetails.error = action.error.message;
      })
  }
});

export const { setProperties } = propertyDeatailsSlice.actions;
export default propertyDeatailsSlice.reducer;
