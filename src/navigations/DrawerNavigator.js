import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {View, Text} from 'react-native';
import DrawerContent from './DrawerContent';
import MenuIcon from '../assets/icons/menu.svg';
import Home from '../screens/Home';
import Profile from '../screens/Profile';


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    
    return (
        <Drawer.Navigator
         drawerContent={props => <DrawerContent {...props} />}
         initialRouteName ="Home" screenOptions={{
            drawerStyle: {
                width: "100%",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                // backgroundColor: "#00000030",
                opacity: 1,
                overlayColor: "red"
            },
            drawerType: "slide",
            // drawerType: "front",
            headerShown: false,
            overlayColor: "white"
        }}>
            <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
            <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
