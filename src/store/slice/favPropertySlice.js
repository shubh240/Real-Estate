import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

export const getFavPropertyList = createAsyncThunk("FavPropertyList", async ({page,filters}, { dispatch }) => {
    try {
        dispatch(setLoader(true));
        const data = await API.PropertyFavApi(page,filters);
        dispatch(setLoader(false));
        return data;
    } catch (error) {
        dispatch(setLoader(false));
        throw error;
    }
});


const initialState = {
    FavPropertyList: {
        data: [],
        error: null,
    }
};

const FavPropertyListSlice = createSlice({
    name: "FavPropertyList",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFavPropertyList.fulfilled, (state, action) => {
                state.FavPropertyList.data = action.payload.data;
            })
            .addCase(getFavPropertyList.rejected, (state, action) => {
                state.FavPropertyList.error = action.error.message;
            })
    },
});

export default FavPropertyListSlice.reducer;
