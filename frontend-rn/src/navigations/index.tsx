import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet, View, Text, Image } from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import { useAppSelector } from '../hooks/store.hook';
import { BlurView } from '@react-native-community/blur';
import DentbudLogo from '../assets/images/dentbud-logo-sm.png';
import { useIsConnected } from 'react-native-offline';

const AppNavContainer: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isConnected = useIsConnected();
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
      {!isConnected && (
        <>
          <BlurView style={styles.blurView} blurType="light" blurAmount={5} reducedTransparencyFallbackColor="white" />
          <View style={styles.notifWrapper}>
            <View style={styles.notif}>
              <Image source={DentbudLogo} style={{ width: 30, height: 30, borderRadius: 100, marginRight: 6 }} />
              <Text style={styles.notifText}>You need an active internet connection to use Dentbud.</Text>
            </View>
          </View>
        </>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  notifWrapper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notif: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#4845D250',
    borderStyle: 'solid',
    borderRadius: 10,
    padding: 25,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notifText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginTop: 5,
  },
});

export default AppNavContainer;
