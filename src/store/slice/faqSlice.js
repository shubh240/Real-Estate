import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

export const getFaqList = createAsyncThunk("FaqList", async (type='website', { dispatch }) => {
    try {
        dispatch(setLoader(true));
        const data = await API.getFaqListApi({type});
        dispatch(setLoader(false));
        return data;
    } catch (error) {
        dispatch(setLoader(false));
        throw error;
    }
});


const initialState = {
    faqList: {
        data: [],
        error: null,
    }
};

const FaqSlice = createSlice({
    name: "faqList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFaqList.fulfilled, (state, action) => {
                state.faqList.data = action.payload.data;
            })
            .addCase(getFaqList.rejected, (state, action) => {
                state.faqList.error = action.error.message;
            })
    },
});

export default FaqSlice.reducer;
