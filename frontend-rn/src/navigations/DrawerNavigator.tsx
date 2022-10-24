import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import Activity from '../screens/Activity';
import Course from '../screens/Course';

const DrawerNavigator: React.FC = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          width: '100%',
          // borderTopRightRadius: 20,
          // borderBottomRightRadius: 20,
          backgroundColor: '#ffffff',
          opacity: 1,
        },
        drawerType: 'slide',
        // drawerType: "front",
        headerShown: false,
        overlayColor: 'white',
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Course" component={Course} />
      <Drawer.Screen name="Activity" component={Activity} />
      <Drawer.Screen name="Setting" component={Setting} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
