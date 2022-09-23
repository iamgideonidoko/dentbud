import React from 'react';
import { View, Text } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import { DrawerScreenProps } from '../interfaces/helper.interface';

const Course: React.FC<DrawerScreenProps> = ({ navigation }) => {
  return (
    <View>
      <CustomHeader navigation={navigation} />
      <Text>Hi from Course Page</Text>
      {/* <MenuIcon width={40} height={40} /> */}
    </View>
  );
};

export default Course;
