import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as API from "../../utils/api.service";
import { setLoader } from "./masterSlice";

// Thunks for asynchronous chat actions

export const getInBoxChatApi = createAsyncThunk("getInBoxChat", async ({ property_id }, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const data = await API.getInBoxChat({ property_id });
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});


export const fetchChatHistoryApi = createAsyncThunk("chatHistory", async ({ chat_room_id, receiver_id, property_id }, { dispatch }) => {
  try {
    dispatch(setLoader(true));
    const data = await API.getChatHistory({ chat_room_id, receiver_id, property_id });
    dispatch(setLoader(false));
    return data;
  } catch (error) {
    dispatch(setLoader(false));
    throw error;
  }
});

// Initial state for chat slice

const initialState = {
  getInBoxChat: {
    data: [],
    error: null,
  },
  chatHistory: {
    data: {},
    error: null,
  },
  unreadMessageCount: 0,
};

// Create the chat slice

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle chat list fetching
      .addCase(getInBoxChatApi.fulfilled, (state, action) => {
        state.getInBoxChat.data = action.payload.data;

        //Calculate unreadmessage
        state.unreadMessageCount = action.payload.data.reduce((total, chat) => {
  
          // Check if userDetails array exists and iterate over it
          if (chat.userDetails && Array.isArray(chat.userDetails)) {
              const userUnreadMessages = chat.userDetails.reduce((userTotal, user) => {
                  const unreadMessages = parseInt(user.unreadmessages, 10) || 0; 
                  return userTotal + unreadMessages;
              }, 0);
  
              return total + userUnreadMessages;
          }
          return total;
      }, 0);
      })
      .addCase(getInBoxChatApi.rejected, (state, action) => {
        state.getInBoxChat.error = action.error.message;
        state.getInBoxChat.data = []; // Clear data on error
        state.unreadMessageCount = 0;
      })

      // Handle chat history fetching
      .addCase(fetchChatHistoryApi.fulfilled, (state, action) => {
        state.chatHistory.data = action.payload.data;
      })
      .addCase(fetchChatHistoryApi.rejected, (state, action) => {
        state.chatHistory.error = action.error.message;
        state.chatHistory.data = [];
      });


  },
});

export default chatSlice.reducer;





// sendMessageStatus: {
//   success: false,
//   error: null,
// },

// export const sendMessage = createAsyncThunk("chat/sendMessage", async (messageData, { dispatch }) => {
//   try {
//     dispatch(setLoader(true));
//     const data = await API.sendMessage(messageData);
//     dispatch(setLoader(false));
//     return data;
//   } catch (error) {
//     dispatch(setLoader(false));
//     throw error;
//   }
// });


// // Handle sending messages
// .addCase(sendMessage.fulfilled, (state, action) => {
//   state.sendMessageStatus.success = true;
// })
// .addCase(sendMessage.rejected, (state, action) => {
//   state.sendMessageStatus.error = action.error.message;
//   state.sendMessageStatus.success = false;
// })