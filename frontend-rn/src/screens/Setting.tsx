import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import type { DrawerScreenProps } from '../interfaces/helper.interface';

const Setting: React.FC<DrawerScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title="Setting" />
      <ScrollView style={{ padding: 10 }}>
        <Text
          style={{
            fontFamily: 'FontRegular',
            color: '#00000090',
            fontSize: 16,
          }}
        >
          Configure the settings in this app.
        </Text>
      </ScrollView>
      {/* <MenuIcon width={40} height={40} /> */}
    </View>
  );
};

export default Setting;
