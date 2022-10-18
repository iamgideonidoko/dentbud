import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DrawerScreenProps } from '../interfaces/helper.interface';
const Tab = createMaterialTopTabNavigator();

function TabA() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab A</Text>
    </View>
  );
}
function TabB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab B</Text>
    </View>
  );
}
function TabC() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab C</Text>
    </View>
  );
}

const Timetable: React.FC<DrawerScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title="Timetable" />
      {/* <Text>Hi from Timetable Page</Text> */}

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontFamily: 'FontRegular',
            fontSize: 12,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#4845D2',
          },
          tabBarPressColor: '#4845D220',
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen name="Monday" component={TabA} />
        <Tab.Screen name="Tuesday" component={TabB} />
        <Tab.Screen name="Wednesday" component={TabC} />
        <Tab.Screen name="Thursday" component={TabC} />
        <Tab.Screen name="Friday" component={TabC} />
        <Tab.Screen name="Saturday" component={TabC} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Timetable;
