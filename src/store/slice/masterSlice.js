import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";

export const getCountryList = createAsyncThunk("countryList", async (_, { dispatch }) => {
  try {
    // dispatch(setLoader(true));
    let data = await API.getCountryList();
    // dispatch(setLoader(false));
    return data;
  } catch (error) {
    // dispatch(setLoader(false));
    throw error;
  }
});

export const getAdvertiseListApiCall = createAsyncThunk("advertiseList", async ({ page }, { dispatch }) => {
  try {
    dispatch(setLoader(true))
    const data = await API.AdvertisementDetailsApi({ page });
    dispatch(setLoader(false))
    return data;
  } catch (error) {
    console.log('error :', error.message);
    throw error;
  }
});

export const getLandingPageAdvertiseApiCall = createAsyncThunk("advertiseLanding", async ({options}, { dispatch }) => {
  try {
    dispatch(setLoader(true))
    const data = await API.AdvertisementLandingApi({options});
    dispatch(setLoader(false))
    return data;
  } catch (error) {
    console.log('error :', error.message);
    throw error;
  }
});

//Notification 
export const getNotificationListApiCall = createAsyncThunk("notificationsList", async (submitData, { dispatch }) => {
  try {
    dispatch(setLoader(true))
    const data = await API.listNotificationApi(submitData);
    dispatch(setLoader(false))
    return data;
  } catch (error) {
    throw error;
  }
});

const initialState = {
  isLoading: false,
  isModalOpen: {
    modalType: "",
    isOpen: false,
    data: [],
  },
  advertiseList: {
    data: [],
    error: null,
  },
  advertiseLanding: {
    data: [],
    error: null,
  },
  notificationsList: {
    data: [],
    error: null,
  },
  countryList: {
    data: [],
    error: null,
  }
};

const masterSlice = createSlice({
  name: "MASTER_SLICE",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setModalStatus: (state, action) => {
      const { modalType, isOpen, data } = action.payload;
      state.isModalOpen.modalType = modalType;
      state.isModalOpen.isOpen = isOpen;
      state.isModalOpen.data = data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.countryList.data = action.payload.data;
      })
      .addCase(getCountryList.rejected, (state, action) => {
        state.isLoading = false;
        state.countryList.error = action.error.message;
      })
      .addCase(getAdvertiseListApiCall.fulfilled, (state, action) => {
        state.advertiseList.data = action.payload.data;
      })
      .addCase(getAdvertiseListApiCall.rejected, (state, action) => {
        state.advertiseList.error = action.error.message;
      })
      .addCase(getLandingPageAdvertiseApiCall.fulfilled, (state, action) => {
        state.advertiseLanding.data = action.payload.data;
      })
      .addCase(getLandingPageAdvertiseApiCall.rejected, (state, action) => {
        state.advertiseLanding.error = action.error.message;
      })
      .addCase(getNotificationListApiCall.fulfilled, (state, action) => {
        state.notificationsList.data = action.payload.data;
      })
      .addCase(getNotificationListApiCall.rejected, (state, action) => {
        state.notificationsList.error = action.error.message;
      });
  },
});

export const { setLoader, setModalStatus } = masterSlice.actions;
export default masterSlice.reducer;
