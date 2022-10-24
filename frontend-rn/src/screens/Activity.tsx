import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { DrawerScreenProps } from '../interfaces/helper.interface';
const Tab = createMaterialTopTabNavigator();

function TabA() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task</Text>
    </View>
  );
}
function TabB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Exam</Text>
    </View>
  );
}

const Activity: React.FC<DrawerScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title="Activity" />
      {/* <Text>Hi from Activity Page</Text> */}

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
          tabBarScrollEnabled: false,
        }}
      >
        <Tab.Screen name="Task" component={TabA} />
        <Tab.Screen name="Exam" component={TabB} />
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

export default Activity;
