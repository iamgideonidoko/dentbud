import React from 'react';
import {View, Text} from 'react-native';
import CustomHeader from '../components/CustomHeader';


const Course = ({navigation}) => {
    return (<View>
        <CustomHeader navigation={navigation} />
        <Text>Hi from Course Page</Text>
        {/* <MenuIcon width={40} height={40} /> */}
    </View>)
}

export default Course;
