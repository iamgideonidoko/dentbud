import {createSlice} from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        isAttemtingLogin: false,
        isUserLoaded: false
    },
    reducers: {
        loadUser: (state, action) => {
            // ADMIN_USER_LOADED

            // Failed? AUTH_ERROR
        },
        login: (state, action) => {
            //add to chat array
            state.chat = [...state.chat, action.payload];
        },
        logout: (state, action) => {
            // LOGOUT_SUCCESS
            state.chat = [];
        },
        register: () => {
            
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