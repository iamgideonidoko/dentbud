import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useAppSelector } from '../hooks/store.hook';

const AppNavContainer: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  return (
    <NavigationContainer>
      {/* Status bar is the part at the top where the notification dots are */}
      <StatusBar
        animated={true}
        backgroundColor="white"
        // color="black"
        barStyle={'dark-content'}
        // showHideTransition={statusBarTransition}
        hidden={false}
      />
      {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavContainer;
