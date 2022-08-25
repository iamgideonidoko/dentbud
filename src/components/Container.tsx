import React, {ReactNode} from 'react';
import {View, ScrollView, StyleSheet, StyleProp, ViewStyle} from 'react-native';

interface IContainerProps {
  children: ReactNode;
  style: StyleProp<ViewStyle>;
}

const Container = ({style, children}: IContainerProps) => {
  return (
    <ScrollView>
      <View style={[styles.wrapper, style]}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },
});

export default Container;
