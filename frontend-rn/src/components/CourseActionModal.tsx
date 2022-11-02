import React from 'react';
import type { FC, RefObject } from 'react';
import Modal from 'react-native-modalbox';
import type { ModalProps } from 'react-native-modalbox';
import { StyleSheet, Text } from 'react-native';

const CourseActionModal: FC<ModalProps & { actionModal: RefObject<Modal> }> = ({ actionModal, ...restProps }) => {
  return (
    <Modal style={[styles.actionModal]} ref={actionModal} coverScreen position="bottom" {...restProps}>
      <Text>Basic modal</Text>
    </Modal>
  );
};
const styles = StyleSheet.create({
  actionModal: {
    backgroundColor: 'white',
    height: '100%',
    borderTopEndRadius: 35,
    borderTopLeftRadius: 35,
    marginTop: 70,
    padding: 20,
  },
});

export default CourseActionModal;
