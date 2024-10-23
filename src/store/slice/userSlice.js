import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

export const getUserDetails = createAsyncThunk("userDetails", async (_, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    let data = await API.getUserDetails();
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

const initialState = {
  userDetails: {
    data: {},
    error: null,
  }
};

const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUserDetails: (state) => {
      state.userDetails.data = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails.data = action.payload?.data;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.userDetails.error = action.error.message;
      })
  }
});

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;
