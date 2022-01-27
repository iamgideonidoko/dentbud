import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import {View, Text} from 'react-native';

const Login = () => {
    return (<View>
        <Text>Hi from Login</Text>
    </View>)
}

const SignUp = () => {
    return (<View>
        <Text>Hi from SignUp</Text>
    </View>);
}

const AuthNavigator = () => {
    const AuthStack = createStackNavigator();
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login}></AuthStack.Screen>
            <AuthStack.Screen name="Register" component={SignUp}></AuthStack.Screen>
        </AuthStack.Navigator>
    )
}

export default AuthNavigator
