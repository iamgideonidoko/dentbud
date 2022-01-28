import React from 'react';
import {View, Text} from 'react-native';
import CustomHeader from '../components/CustomHeader';


const Activity = ({navigation}) => {
    return (<View>
        <CustomHeader navigation={navigation} />
        <Text>Hi from Activity Page</Text>
        {/* <MenuIcon width={40} height={40} /> */}
    </View>)
}

export default Activity;
