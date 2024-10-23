import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

export const getCategoryList = createAsyncThunk("categoryList", async (submitData, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const data = await API.categoryList(submitData);
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

export const getPropertyList = createAsyncThunk("propertyList", async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const data = await API.propertyList();
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

export const getPropertyAttributeList = createAsyncThunk("attributeList", async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const data = await API.attributeList();
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

export const getPropertyAmenitiesList = createAsyncThunk("amenitiesList", async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const data = await API.amenitiesList();
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

const initialState = {
  categoryList: {
    data: [],
    error: null,
  },
  propertyList: {
    data: [],
    error: null,
  },
  attributeList: {
    data: [],
    error: null,
  },
  amenitiesList: {
    data: [],
    error: null,
  },
};

const categoryListSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.categoryList.data = action.payload.data;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.categoryList.error = action.error.message;
      })
      .addCase(getPropertyList.fulfilled, (state, action) => {
        state.propertyList.data = action.payload.data;
      })
      .addCase(getPropertyList.rejected, (state, action) => {
        state.propertyList.error = action.error.message;
      })
      .addCase(getPropertyAttributeList.fulfilled, (state, action) => {
        state.attributeList.data = action.payload.data;
      })
      .addCase(getPropertyAttributeList.rejected, (state, action) => {
        state.attributeList.error = action.error.message;
      })
      .addCase(getPropertyAmenitiesList.fulfilled, (state, action) => {
        state.amenitiesList.data = action.payload.data;
      })
      .addCase(getPropertyAmenitiesList.rejected, (state, action) => {
        state.amenitiesList.error = action.error.message;
      })    
  },
});

export default categoryListSlice.reducer;
