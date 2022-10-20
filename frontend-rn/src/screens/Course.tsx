import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import type { DrawerScreenProps } from '../interfaces/helper.interface';
import { useIsConnected } from 'react-native-offline';

const Course: React.FC<DrawerScreenProps> = ({ navigation }) => {
  const isConnected = useIsConnected();
  return (
    <View>
      <CustomHeader navigation={navigation} />
      <Text>Hi from Course Page</Text>
      {isConnected ? <Text>CONNECTED</Text> : <Text>NOT CONNECTED</Text>}
      {/* <MenuIcon width={40} height={40} /> */}
    </View>
  );
};

export default Course;
