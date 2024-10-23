import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "./masterSlice";
import * as API from "../../utils/api.service";
import { TOAST_SUCCESS } from "../../utils/common.service";

export const getSubscriptionListApiCall = createAsyncThunk("subscriptionList", async (submitData, { dispatch }) => {
    try {
        dispatch(setLoader(true))
        const data = await API.getSubscriptionListApi(submitData);
        dispatch(setLoader(false))
        return data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    subscriptionList: {
        data: [],
        error: null,
    }
};

const subscriptionSlice = createSlice({
    name: "SubscriptionList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSubscriptionListApiCall.fulfilled, (state, action) => {
                state.subscriptionList.data = action.payload.data;
            })
            .addCase(getSubscriptionListApiCall.rejected, (state, action) => {
                state.subscriptionList.error = action.error.message;
            })
    },
});

export default subscriptionSlice.reducer;