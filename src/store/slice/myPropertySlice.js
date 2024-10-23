import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

export const getProperty = createAsyncThunk("properties", async ({page}, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.myProperty(page);
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

export const getPropertyDetails = createAsyncThunk("propertiesDetails", async ({property_id}, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.myPropertyDetails({property_id});
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

export const getFavPropertyDetails = createAsyncThunk("favpropertiesDetails", async ({property_id}, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.FavPropertyDetailsApi({property_id});
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

const initialState = {
    properties: {
    data: {},
    error: null,
  },
    propertiesDetails: {
    data: {},
    error: null,
  },
  favpropertiesDetails: {
    data: {},
    error: null,
  },
};

const propertySlice = createSlice({
  name: "Property",
  initialState,
  reducers: {
    setProperties: (state) => {
      state.properties.data = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProperty.fulfilled, (state, action) => {
        state.properties.data = action.payload.data;
      })
      .addCase(getProperty.rejected, (state, action) => {
        state.properties.error = action.error.message;
      })
      .addCase(getPropertyDetails.fulfilled, (state, action) => {
        state.propertiesDetails.data = action.payload.data;
      })
      .addCase(getPropertyDetails.rejected, (state, action) => {
        state.propertiesDetails.error = action.error.message;
      })
      .addCase(getFavPropertyDetails.fulfilled, (state, action) => {
        state.favpropertiesDetails.data = action.payload.data;
      })
      .addCase(getFavPropertyDetails.rejected, (state, action) => {
        state.favpropertiesDetails.error = action.error.message;
      })
  }
});

export const { setProperties } = propertySlice.actions;
export default propertySlice.reducer;
