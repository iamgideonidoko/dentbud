import React from 'react';
import {createDrawerNavigator} from "@react-navigation/drawer";
import {View, Text} from 'react-native';
import DrawerContent from './DrawerContent';
import MenuIcon from '../assets/icons/menu.svg';

const Home = () => {
    return (<View>
        <Text>Hi from Home</Text>
        <MenuIcon />
    </View>)
}

const Profile = () => {
    return (<View>
        <Text>Hi from Settings</Text>
    </View>);
}

const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    
    return (
        <Drawer.Navigator
         drawerContent={props => <DrawerContent {...props} />}
         initialRouteName ="Home" screenOptions={{
            drawerStyle: {
                // width: 100,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                // backgroundColor: "#00000030",
                opacity: 1
            },
            drawerType: "slide",
            // drawerType: "front",
            headerShown: false
        }}>
            <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
            <Drawer.Screen name="Profile" component={Profile}></Drawer.Screen>
        </Drawer.Navigator>
    );
}

export default DrawerNavigator;
