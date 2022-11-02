import React from 'react';
import { View } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import type { DrawerScreenProps } from '../interfaces/helper.interface';
import Task from './Task';

const Tab = createMaterialTopTabNavigator();

// function TabB() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Exam</Text>
//     </View>
//   );
// }

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
        <Tab.Screen name="Task" component={Task} />
        {/* <Tab.Screen name="Exam" component={TabB} /> */}
      </Tab.Navigator>
    </View>
  );
};

export default Activity;
