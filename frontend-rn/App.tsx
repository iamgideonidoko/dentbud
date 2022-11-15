/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './src/navigations';
import { Provider } from 'react-redux';
import store from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { NetworkProvider } from 'react-native-offline';
import { ToastProvider } from 'react-native-toast-notifications';
// import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
// import { Alert } from 'react-native';
import { CORE_BE_HOST } from '@env';

// setJSExceptionHandler((error, isFatal) => {
//   console.log(error, isFatal);
//   Alert.alert(`${isFatal ? 'Fatal: ' : 'Not Fatal: '} ${error.name}`, error.message);
// }, true);

// setNativeExceptionHandler((errorString) => {
//   console.log(errorString);
// }, true);

const persistor = persistStore(store);

store.subscribe(() => console.log('📦 AUTH STORE: ', store.getState().auth));
console.log('🌐 CORE_BE_HOST: ', CORE_BE_HOST);

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NetworkProvider>
          <ToastProvider>
            <AppNavContainer />
          </ToastProvider>
        </NetworkProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
