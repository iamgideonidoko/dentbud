import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import CustomHeader from '../components/CustomHeader';


const Activity = ({navigation}) => {
    return (<View style={{flex: 1}}>
        <CustomHeader navigation={navigation} title="Activity" />
        <ScrollView style={{padding: 10}}>
            <Text style={{fontFamily: "Euclid Circular A Regular", color: "#00000090", fontSize: 16}}>Your activities range from events, tasks, routines etc.</Text>
        </ScrollView>
        {/* <MenuIcon width={40} height={40} /> */}
    </View>)
}

export default Activity;
