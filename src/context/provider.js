import React, {createContext, useReducer} from 'react';
import authReducer, {authInitialState} from './reducers/authReducer';

export const GlobalContext = createContext({});

const GlobalProvider = ({children}) => {

    // pass reducer and initial state to `useReducer` to get authState and authDispatch
    const [authState, authDispatch] = useReducer(authReducer, authInitialState);

    

    return (
        <GlobalContext.Provider value={{
            authState,
            authDispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;