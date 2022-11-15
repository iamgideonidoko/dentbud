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
import CheckBox from '@react-native-community/checkbox';
import type { AddTaskInput, GetTaskResponse } from '../interfaces/store.interface';
import { useAppSelector } from '../hooks/store.hook';
import SimpleReactValidator from 'simple-react-validator';
import { useToast } from 'react-native-toast-notifications';
import { useAddTaskMutation, useUpdateTaskMutation } from '../store/api/task.api';

const TaskActionModal: FC<
  ModalProps & {
    actionModal: RefObject<Modal>;
    actionModalPayload: RefObject<{
      actionMode: 'create' | 'edit';
      taskInfo: GetTaskResponse | null;
    }>;
    shouldUpdate: boolean;
  }
> = ({ actionModal, actionModalPayload, shouldUpdate, ...restProps }) => {
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();
  const user_id = useAppSelector((state) => state.auth.userInfo?.id as string);
  const [taskInput, setTaskInput] = useState<AddTaskInput>({
    user_id,
    title: '',
    description: '',
    done: false,
    starts: new Date(),
    ends: new Date(),
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
      const { actionMode: mode, taskInfo } = actionModalPayload.current;
      setActionMode(mode);
      setTaskInput((prev) => ({
        ...prev,
        title: taskInfo?.title ?? '',
        description: taskInfo?.description ?? '',
        done: taskInfo?.done ?? false,
        starts: taskInfo?.starts ? new Date(taskInfo?.starts) : new Date(),
        ends: taskInfo?.ends ? new Date(taskInfo?.ends) : new Date(),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdate]);

  const handleAction = async () => {
    if (simpleValidator.current.allValid()) {
      if (actionMode === 'create') {
        try {
          await addTask(taskInput).unwrap();
          setTaskInput((prev) => ({
            ...prev,
            title: '',
            description: '',
            done: false,
            starts: new Date(),
            ends: new Date(),
          }));
          actionModal.current?.close();
          toast.show('Task added ✅', { placement: 'top', type: 'success' });
        } catch (err) {
          toast.show(`${(err as { data: { message: string } }).data?.message ?? 'Could not add task'} 😔`, {
            placement: 'top',
            type: 'danger',
          });
        }
      } else if (actionMode === 'edit') {
        try {
          const { title, description, done, starts, ends } = taskInput;
          await updateTask({
            id: actionModalPayload.current?.taskInfo?._id ?? '',
            user_id,
            title,
            description,
            done,
            starts,
            ends,
          }).unwrap();
          actionModal.current?.close();
          toast.show('Task updated ✅', { placement: 'top', type: 'success' });
        } catch (err) {
          toast.show(`${(err as { data: { message: string } }).data?.message ?? 'Could not update task'} 😔`, {
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
          <Text style={[globalStyles.text, styles.modalTitle]}>Add task</Text>
          <TouchableWithoutFeedback onPress={() => actionModal.current?.close()}>
            <CloseIcon width={25} height={25} />
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.modalScroll}>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Title</Text>
            <TextInput
              style={[globalStyles.text, styles.input]}
              autoCapitalize={'none'}
              keyboardType="name-phone-pad"
              textContentType="name"
              value={taskInput.title}
              onChangeText={(text) => setTaskInput((prev) => ({ ...prev, title: text }))}
            />
            {
              /* simple validation */
              simpleValidator.current.message('title', taskInput.title, 'required|alpha_num_dash_space|between:2,100')
            }
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Description</Text>
            <TextInput
              style={[globalStyles.text, styles.input, { height: 100, textAlignVertical: 'top' }]}
              autoCapitalize={'none'}
              keyboardType="name-phone-pad"
              textContentType="name"
              multiline
              value={taskInput.description}
              onChangeText={(text) => setTaskInput((prev) => ({ ...prev, description: text }))}
            />
            {
              /* simple validation */
              simpleValidator.current.message('description', taskInput.description, 'alpha_num_space|between:2,500')
            }
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Done</Text>
            <CheckBox
              disabled={false}
              value={taskInput.done}
              onCheckColor="#4845D2"
              onTintColor="#4845D2"
              tintColors={{ true: '#4845D2' }}
              onValueChange={(done) => setTaskInput((prev) => ({ ...prev, done }))}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Starts</Text>
            <DatePicker
              date={taskInput.starts as Date}
              onDateChange={(date) => setTaskInput((prev) => ({ ...prev, starts: date }))}
              textColor="black"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={[globalStyles.text, styles.inputLabel]}>Ends</Text>
            <DatePicker
              date={taskInput.ends as Date}
              onDateChange={(date) => setTaskInput((prev) => ({ ...prev, ends: date }))}
              textColor="black"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAction}>
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

export default TaskActionModal;
