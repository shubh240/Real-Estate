import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

//landing page
export const getLandingProperty = createAsyncThunk("landingProperties", async ({ page, filters }, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.landingProperty(page, filters);
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

//home page
export const getHomeProperty = createAsyncThunk("homeProperties", async ({ page, filters = {} } = {}, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.homeProperty(page, filters);
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

const initialState = {
  landingProperties: {
    data: [],
    error: null,
  },
  homeProperties: {
    data: [],
    error: null,
  },
};

const landingPropertySlice = createSlice({
  name: "landingProperty",
  initialState,
  reducers: {
    setLandingProperties: (state) => {
      state.landingProperties.data = [];
      state.homeProperties.data = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLandingProperty.fulfilled, (state, action) => {
        // Check if payload and payload.data exist before assigning
        if (action.payload && action.payload.data) {
          state.landingProperties.data = action.payload.data;
        } else {
          // Set an empty array or default value if data is undefined
          state.landingProperties.data = [];
          state.landingProperties.error = "No data available";
        }
      })
      .addCase(getLandingProperty.rejected, (state, action) => {
        state.landingProperties.error = action.error.message;
      })
      .addCase(getHomeProperty.fulfilled, (state, action) => {
        // Check if payload and payload.data exist before assigning
        if (action.payload && action.payload.data) {
          state.homeProperties.data = action.payload.data;
        } else {
          state.homeProperties.data = [];
          state.homeProperties.error = "No data available";
        }
      })
      .addCase(getHomeProperty.rejected, (state, action) => {
        state.homeProperties.error = action.error.message;
      })
  }
});

export const { setLandingProperties } = landingPropertySlice.actions;
export default landingPropertySlice.reducer;
