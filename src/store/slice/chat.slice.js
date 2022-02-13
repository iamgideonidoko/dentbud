import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosHeaders } from '../../helper';

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chat: [],
        loading: ""
    },
    reducers: {
        addToChat: (state, action) => {
            //add to chat array
            state.chat = [...state.chat, action.payload];
        },
        clearChat: (state, action) => {
            state.chat = [];
        }
    }, 
    extraReducers: {
        
    }
});

// export actions
export const {
   addToChat,
   clearChat 
} = chatSlice.actions;

export default chatSlice.reducer;