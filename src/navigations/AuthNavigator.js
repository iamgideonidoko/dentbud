import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthNavigator = () => {
    const AuthStack = createStackNavigator();

    return (
        <AuthStack.Navigator 
            initialRouteName="Login"
            screenOptions={{ 
                headerStyle: {backgroundColor: "transparent"},
                headerShown: false // remove the header in the screen
             }}
        >
            <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
            <AuthStack.Screen name="Register" component={Register}></AuthStack.Screen>
        </AuthStack.Navigator>
    );
}

export default AuthNavigator
