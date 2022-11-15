import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import type { DrawerScreenProps } from '../interfaces/helper.interface';
import globalStyles from '../styles/global.style';

const Setting: React.FC<DrawerScreenProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} title="Setting" />
      <ScrollView style={{ padding: 10 }}>
        <Text style={[globalStyles.text, { fontStyle: 'italic', marginTop: 20 }]}>Setting coming soon...</Text>
        <Text style={[globalStyles.text, { marginTop: 20 }]}>App built with ❤ by Gideon Idoko.</Text>
      </ScrollView>
      {/* <MenuIcon width={40} height={40} /> */}
    </View>
  );
};

export default Setting;
