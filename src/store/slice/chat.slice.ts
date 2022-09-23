import { createSlice /* , createAsyncThunk */ } from '@reduxjs/toolkit';
// import axios from 'axios';
// import {axiosHeaders} from '../../helper';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chat: [
      {
        sender: 'DentBud',
        message: 'Hello, how are you doing?',
        time: '6:02 PM',
      },
      {
        sender: 'User',
        message: 'I am good, how about you?',
        time: '6:02 PM',
      },
      {
        sender: 'DentBud',
        message: '😊😇',
        time: '6:02 PM',
      },
      {
        sender: 'User',
        message: "Can't wait to meet you.",
        time: '6:03 PM',
      },
      {
        sender: 'DentBud',
        message: "That's great, when are you coming?",
        time: '6:03 PM',
      },
      {
        sender: 'User',
        message: 'This weekend.',
        time: '6:03 PM',
      },
      {
        sender: 'DentBud',
        message: 'Around 4 to 6 PM.',
        time: '6:04 PM',
      },
      {
        sender: 'User',
        message: "Great, don't forget to bring me some mangoes.",
        time: '6:05 PM',
      },
      {
        sender: 'DentBud',
        message: 'Sure!',
        time: '6:05 PM',
      },
    ],
    loading: '',
  },
  reducers: {
    addToChat: (state, action) => {
      //add to chat array
      state.chat = [...state.chat, action.payload];
    },
    clearChat: (state, action) => {
      state.chat = [];
    },
  },
  extraReducers: {},
});

// export actions
export const { addToChat, clearChat } = chatSlice.actions;

export default chatSlice.reducer;
