import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {Text, View} from 'react-native';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const AppNavContainer = () => {
    return (
        <NavigationContainer>
            {/* <Text>God is good</Text> */}
            <DrawerNavigator />
        </NavigationContainer>
    )
}

export default AppNavContainer
