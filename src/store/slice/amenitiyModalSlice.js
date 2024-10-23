import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

const initialState = {
    amenityOpen: {
        modalType: "",
        isOpen: false,
        data: [],
      },
};
const amenitiesSlice = createSlice({
    name: "ATTRIBUTE",
    initialState,
    reducers: {
        setAmenityStatus: (state, action) => {
            const { modalType, isOpen, data } = action.payload;
            state.amenityOpen.modalType = modalType;
            state.amenityOpen.isOpen = isOpen;
            state.amenityOpen.data = data;
          }
    },

});

export const { setAmenityStatus } = amenitiesSlice.actions;
export default amenitiesSlice.reducer;
