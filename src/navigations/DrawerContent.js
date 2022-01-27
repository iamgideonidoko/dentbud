import React from 'react';
import Container from '../components/Container'
import {SafeAreaView, Text} from 'react-native';

const DrawerContent = (props) => {
  return <SafeAreaView>
    <Container>
        <Text>This is a custom drawer text</Text>
    </Container>
  </SafeAreaView>;
};

export default DrawerContent;
