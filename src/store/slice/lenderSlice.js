import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

const initialState = {
   lenderOpen: {
        modalType: "",
        isOpen: false,
        data: [],
      },
};
const amenitiesSlice = createSlice({
    name: "LENDER",
    initialState,
    reducers: {
        setLenderStatus: (state, action) => {
            const { modalType, isOpen, data } = action.payload;
            state.lenderOpen.modalType = modalType;
            state.lenderOpen.isOpen = isOpen;
            state.lenderOpen.data = data;
          }
    },

});

export const { setLenderStatus } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;
