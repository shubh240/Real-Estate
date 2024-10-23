import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "./masterSlice";
import * as API from "../../utils/api.service";

export const getResourceListApiCall = createAsyncThunk("resourceList", async (submitData, { dispatch }) => {
    try {
        dispatch(setLoader(true))
        const data = await API.getResourceListApi(submitData);
        dispatch(setLoader(false))
        return data;
    } catch (error) {
        throw error;
    }
});

const initialState = {
    resourceList: {
        data: [],
        error: null,
    }
};

const ResourceSlice = createSlice({
    name: "ResourceList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getResourceListApiCall.fulfilled, (state, action) => {
                state.resourceList.data = action.payload.data;
            })
            .addCase(getResourceListApiCall.rejected, (state, action) => {
                state.resourceList.error = action.error.message;
            })
    },
});

export default ResourceSlice.reducer;