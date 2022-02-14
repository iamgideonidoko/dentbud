import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavContainer = () => {
    return (
        <NavigationContainer>
            {/* Status bar is the part at the top where the notification dots are */}
            <StatusBar
                animated={true}
                backgroundColor="white"
                color="black"
                barStyle={"dark-content"}
                // showHideTransition={statusBarTransition}
                hidden={false} />

            <AuthNavigator />
            {/* <DrawerNavigator /> */}
        </NavigationContainer>
    )
}

export default AppNavContainer
