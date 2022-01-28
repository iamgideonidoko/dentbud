import React from 'react';
import {View, Text, Button} from 'react-native';
import CustomHeader from '../components/CustomHeader';


const Home = ({navigation}) => {
    return (<View>
        <CustomHeader navigation={navigation} />
        <Text>Hi from Home</Text>
    </View>)
}

export default Home;
