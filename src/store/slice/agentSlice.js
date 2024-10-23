import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

const initialState = {
    agentOpen: {
        modalType: "",
        isOpen: false,
        data: [],
      },
};
const agentSlice = createSlice({
    name: "AGENT",
    initialState,
    reducers: {
        setAgentStatus: (state, action) => {
            const { modalType, isOpen, data } = action.payload;
            state.agentOpen.modalType = modalType;
            state.agentOpen.isOpen = isOpen;
            state.agentOpen.data = data;
          }
    },

});

export const { setAgentStatus } = agentSlice.actions;
export default agentSlice.reducer;
