import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {View, Text} from 'react-native';
import DrawerContent from './DrawerContent';
import MenuIcon from '../assets/icons/menu.svg';
import Home from '../screens/Home';
import Activity from '../screens/Activity';
import Timetable from '../screens/Timetable';
import Course from '../screens/Course';


const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    
    return (
        <Drawer.Navigator
         drawerContent={props => <DrawerContent {...props} />}
         initialRouteName ="Home" screenOptions={{
            drawerStyle: {
                width: "100%",
                // borderTopRightRadius: 20,
                // borderBottomRightRadius: 20,
                backgroundColor: "#ffffff",
                opacity: 1,
                overlayColor: "white"
            },
            drawerType: "slide",
            // drawerType: "front",
            headerShown: false,
            overlayColor: "white"
        }}>
            <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
            <Drawer.Screen name="Activity" component={Activity}></Drawer.Screen>
            <Drawer.Screen name="Course" component={Course}></Drawer.Screen>
            <Drawer.Screen name="Timetable" component={Timetable}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
