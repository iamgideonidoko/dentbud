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

const persistor = persistStore(store);

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
