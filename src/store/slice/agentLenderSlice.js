import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoader } from "./masterSlice";
import * as API from "../../utils/api.service";
import { TOAST_SUCCESS } from "../../utils/common.service";

export const getAgentApiCall = createAsyncThunk("agentList", async (submitData, { dispatch }) => {
    try {
        dispatch(setLoader(true))
        const data = await API.getAgentListApi(submitData);
        dispatch(setLoader(false))
        return data;
    } catch (error) {
        throw error;
    }
});

export const getLenderApiCall = createAsyncThunk("lenderList", async (submitData, { dispatch }) => {
    try {
        dispatch(setLoader(true))
        const data = await API.getLenderListApi(submitData);
        dispatch(setLoader(false))
        return data;
    } catch (error) {
        throw error;
    }
});


const initialState = {
    agentList: {
        data: [],
        error: null,
    },
    lenderList: {
        data: [],
        error: null,
    }
};

const agentLenderSlice = createSlice({
    name: "AGENTLENDER",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAgentApiCall.fulfilled, (state, action) => {
                state.agentList.data = action.payload.data;
            })
            .addCase(getAgentApiCall.rejected, (state, action) => {
                state.agentList.error = action.error.message;
            })
            .addCase(getLenderApiCall.fulfilled, (state, action) => {
                state.lenderList.data = action.payload.data;
            })
            .addCase(getLenderApiCall.rejected, (state, action) => {
                state.lenderList.error = action.error.message;
            })
    },
});

export default agentLenderSlice.reducer;