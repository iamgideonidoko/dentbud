import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';

const Container = ({style, children}) => {
  return <ScrollView>
    <View style={[styles.wrapper, style]}>{children}</View>
  </ScrollView>;
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 20
    }
})

export default Container;
