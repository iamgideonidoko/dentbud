import { createSlice } from '@reduxjs/toolkit';
import type { ChatState, SingleChat } from '../../interfaces/store.interface';
import type { PayloadAction } from '@reduxjs/toolkit';
import chatApi from '../api/chat.api';
import dayjs from 'dayjs';

const initialState: ChatState = {
  chat: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addToChat: (state, { payload }: PayloadAction<SingleChat>) => {
      //add to chat array
      state.chat = [...state.chat, payload];
    },
    clearChat: (state) => {
      state.chat = [];
    },
    setChat: (state, { payload }: PayloadAction<SingleChat[]>) => {
      state.chat = payload;
    },
    undoLastChat: (state) => {
      state.chat = [...state.chat].slice(0, -1);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(chatApi.endpoints.converseRasa.matchFulfilled, (state, { payload }) => {
      console.log('Rasa response => ', payload);
      state.chat = [...state.chat, { sender: 'dentbud', message: payload.text, time: dayjs().toISOString() }];
    });
  },
});

// export actions
export const { addToChat, clearChat, undoLastChat } = chatSlice.actions;

export default chatSlice.reducer;
