import React, { useState, useRef, useEffect } from 'react';
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
  Keyboard,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CloseIcon from '../assets/icons/Close.svg';
import globalStyles from '../styles/global.style';
import type { AddCourseInput, GetCourseResponse } from '../interfaces/store.interface';
import { useAppSelector } from '../hooks/store.hook';
import SimpleReactValidator from 'simple-react-validator';
import { useToast } from 'react-native-toast-notifications';
import { useAddCourseMutation, useUpdateCourseMutation } from '../store/api/course.api';

const CourseActionModal: FC<
  ModalProps & {
    actionModal: RefObject<Modal>;
    actionModalPayload: RefObject<{
      actionMode: 'create' | 'edit';
      courseInfo: GetCourseResponse | null;
    }>;
    shouldUpdate: boolean;
  }
> = ({ actionModal, actionModalPayload, shouldUpdate, ...restProps }) => {
  const [addCourse, { isLoading: isAdding }] = useAddCourseMutation();
  const [updateCourse, { isLoading: isUpdating }] = useUpdateCourseMutation();
  const user_id = useAppSelector((state) => state.auth.userInfo?.id as string);
  const [courseInput, setCourseInput] = useState<AddCourseInput>({
    user_id,
    course_name: '',
    course_code: '',
    exam_starts: new Date(),
    exam_ends: new Date(),
  });
  const [, forceUpdate] = useState<boolean>(false);
  const [actionMode, setActionMode] = useState<'create' | 'edit'>('create');
  const toast = useToast();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <Text style={globalStyles.formErrorMsg}>{message}</Text>,
    }),
  );

  useEffect(() => {
    if (actionModalPayload.current) {
      const { actionMode: mode, courseInfo } = actionModalPayload.current;
      setActionMode(mode);
      setCourseInput((prev) => ({
        ...prev,
        course_name: courseInfo?.course_name ?? '',
        course_code: courseInfo?.course_code ?? '',
        exam_starts: courseInfo?.exam_starts ? new Date(courseInfo?.exam_starts) : new Date(),
        exam_ends: courseInfo?.exam_ends ? new Date(courseInfo?.exam_ends) : new Date(),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);

  const handleAction = async () => {
    if (simpleValidator.current.allValid()) {
      if (actionMode === 'create') {
        try {
          await addCourse(courseInput).unwrap();
          setCourseInput((prev) => ({
            ...prev,
            course_name: '',
            course_code: '',
            exam_starts: new Date(),
            exam_ends: new Date(),
          }));
          actionModal.current?.close();
          toast.show('Course added ✅', { placement: 'top', type: 'success' });
        } catch (err) {
          toast.show(`${(err as { data: { message: string } }).data?.message ?? 'Could not add course'} 😔`, {
            placement: 'top',
            type: 'danger',
          });
        }
      } else if (actionMode === 'edit') {
        try {
          const { course_name, course_code, exam_starts, exam_ends } = courseInput;
          await updateCourse({
            id: actionModalPayload.current?.courseInfo?._id ?? '',
            new_course_code: actionModalPayload.current?.courseInfo?.course_code !== course_code,
            user_id,
            course_name,
            course_code,
            exam_starts,
            exam_ends,
          }).unwrap();
          actionModal.current?.close();
          toast.show('Course updated ✅', { placement: 'top', type: 'success' });
        } catch (err) {
          toast.show(`${(err as { data: { message: string } }).data?.message ?? 'Could not update course'} 😔`, {
            placement: 'top',
            type: 'danger',
          });
        }
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Modal style={[styles.actionModal]} ref={actionModal} coverScreen position="bottom" {...restProps}>
        <View style={styles.modalHeader}>
          <Text style={[globalStyles.text, styles.modalTitle]}>
            {actionMode === 'edit'
              ? `Update Course: ${actionModalPayload.current?.courseInfo?.course_code ?? ''}`.trim()
              : 'Add Course'}
          </Text>
          <TouchableWithoutFeedback onPress={() => actionModal.current?.close()}>
            <CloseIcon width={25} height={25} />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.modalScroll}>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Course Name</Text>
            <TextInput
              style={[globalStyles.text, styles.input]}
              autoCapitalize={'none'}
              keyboardType="name-phone-pad"
              textContentType="name"
              value={courseInput.course_name}
              onChangeText={(text) => setCourseInput((prev) => ({ ...prev, course_name: text }))}
            />
            {
              /* simple validation */
              simpleValidator.current.message(
                'course name',
                courseInput.course_name,
                'required|alpha_num_space|between:2,100',
              )
            }
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Course Code</Text>
            <TextInput
              style={[globalStyles.text, styles.input]}
              autoCapitalize={'none'}
              keyboardType="name-phone-pad"
              textContentType="name"
              value={courseInput.course_code}
              onChangeText={(text) => setCourseInput((prev) => ({ ...prev, course_code: text }))}
            />
            {
              /* simple validation */
              simpleValidator.current.message(
                'course name',
                courseInput.course_code,
                'required|alpha_num|between:2,100',
              )
            }
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Exam Starts</Text>
            <DatePicker
              date={courseInput.exam_starts as Date}
              onDateChange={(date) => setCourseInput((prev) => ({ ...prev, exam_starts: date }))}
              textColor="black"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Exam Ends</Text>
            <DatePicker
              date={courseInput.exam_ends as Date}
              onDateChange={(date) => setCourseInput((prev) => ({ ...prev, exam_ends: date }))}
              textColor="black"
            />
          </View>
          <TouchableOpacity style={styles.button} disabled={isAdding} onPress={handleAction}>
            <Text style={[globalStyles.text, styles.buttonText]}>
              {actionMode === 'edit' ? (isUpdating ? 'Updating...' : 'Update') : isAdding ? 'Adding...' : 'Add'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </TouchableWithoutFeedback>
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
