import React, { useState } from 'react';
import type { FC, RefObject } from 'react';
import Modal from 'react-native-modalbox';
import type { ModalProps } from 'react-native-modalbox';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CloseIcon from '../assets/icons/Close.svg';

const CourseActionModal: FC<ModalProps & { actionModal: RefObject<Modal> }> = ({ actionModal, ...restProps }) => {
  const [examStarts, setExamStarts] = useState(new Date());
  const [examEnds, setExamEnds] = useState(new Date());

  const handleAction = () => {
    console.log('action is to be made');
  };
  return (
    <Modal style={[styles.actionModal]} ref={actionModal} coverScreen position="bottom" {...restProps}>
      <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>Add course</Text>
        <TouchableWithoutFeedback onPress={() => actionModal.current?.close()}>
          <CloseIcon width={25} height={25} />
        </TouchableWithoutFeedback>
      </View>
      <ScrollView style={styles.modalScroll}>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Course Name</Text>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            keyboardType="name-phone-pad"
            textContentType="name"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Course Code</Text>
          <TextInput
            style={styles.input}
            autoCapitalize={'none'}
            keyboardType="name-phone-pad"
            textContentType="name"
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Exam Starts</Text>
          <DatePicker date={examStarts} onDateChange={setExamStarts} />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>Exam Ends</Text>
          <DatePicker date={examEnds} onDateChange={setExamEnds} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleAction}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingVertical: 20,
  },
  modalHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: 'black',
    fontFamily: 'FontMedium',
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 6,
    color: 'black',
    fontFamily: 'FontRegular',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#dfe4ea',
  },
  modalScroll: {
    paddingHorizontal: 20,
    marginBottom: 65,
  },
  button: {
    backgroundColor: '#4845D2',
    marginVertical: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'FontRegular',
  },
});

export default CourseActionModal;
