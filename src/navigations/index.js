import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Text, View, StatusBar} from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavContainer = () => {
    return (
        <NavigationContainer>
            <StatusBar
                animated={true}
                backgroundColor="white"
                color="black"
                barStyle={"dark-content"}
                // showHideTransition={statusBarTransition}
                hidden={false} />
            {/* <Text>God is good</Text> */}
            <DrawerNavigator />
        </NavigationContainer>
    )
}

export default AppNavContainer
