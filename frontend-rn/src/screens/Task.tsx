import React, { useState, useRef } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import type { AccordionRenderFC, AccordionSection } from '../interfaces/helper.interface';
import Accordion from 'react-native-collapsible/Accordion';
import type { FC, RefObject, Dispatch, SetStateAction } from 'react';
import PlusIcon from '../assets/icons/Plus.svg';
import EditIcon from '../assets/icons/Edit.svg';
import NotificationIcon from '../assets/icons/Notification.svg';
import NotificationActiveIcon from '../assets/icons/NotificationActive.svg';
import TrashIcon from '../assets/icons/Trash.svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import globalStyles from '../styles/global.style';
import TaskActionModal from '../components/TaskActionModal';
import Modal from 'react-native-modalbox';
import { useGetTasksQuery, useDeleteTaskMutation } from '../store/api/task.api';
import { useAppSelector } from '../hooks/store.hook';
import type { GetTaskResponse } from '../interfaces/store.interface';
import dayjs from 'dayjs';

const TaskHeader: FC<{
  actionModal: RefObject<Modal>;
  actionModalPayload: RefObject<{
    actionMode: 'create' | 'edit';
    taskInfo: GetTaskResponse | null;
  }>;
  setShouldUpdate: Dispatch<SetStateAction<boolean>>;
  hasTask: boolean;
}> = ({ actionModal, actionModalPayload, setShouldUpdate, hasTask }) => {
  const handleModalOpen = () => {
    if (actionModalPayload.current) {
      actionModalPayload.current.actionMode = 'create';
      actionModalPayload.current.taskInfo = null;
      setShouldUpdate((prev) => !prev);
      actionModal.current?.open();
    }
  };
  return (
    <View style={styles.sectionTitle}>
      <Text style={[globalStyles.text, { width: wp('100%') - 80 }]}>
        {hasTask ? 'Here are all your tasks:' : 'You do not have any task, use the plus button to add one.'}
      </Text>
      <TouchableWithoutFeedback onPress={() => handleModalOpen()}>
        <PlusIcon width={25} height={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const taskHeader: AccordionRenderFC<
  {
    handleDeleteTask: (id: string) => void;
    actionModalPayload: RefObject<{
      actionMode: 'create' | 'edit';
      taskInfo: GetTaskResponse | null;
    }>;
    actionModal: RefObject<Modal>;
    setShouldUpdate: Dispatch<SetStateAction<boolean>>;
  },
  GetTaskResponse
> = ({ handleDeleteTask, actionModalPayload, actionModal, setShouldUpdate }, { title, content }, __, isActive) => {
  const handleEditPress = () => {
    if (actionModalPayload.current) {
      actionModalPayload.current.actionMode = 'edit';
      actionModalPayload.current.taskInfo = content;
      setShouldUpdate((prev) => !prev);
      actionModal.current?.open();
    }
  };
  return (
    <View style={[styles.header, { backgroundColor: isActive ? '#4845d2' : '#dadaf6' }]}>
      <Text style={[globalStyles.text, styles.headerText, { color: isActive ? 'white' : '#070715' }]}>{title}</Text>
      <View style={styles.headerActions}>
        <TouchableWithoutFeedback onPress={() => console.log('trigger notification')}>
          {true ? (
            <NotificationIcon style={styles.headerActionBtn} width={20} height={20} />
          ) : (
            <NotificationActiveIcon style={styles.headerActionBtn} width={20} height={20} />
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handleEditPress()}>
          <EditIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => handleDeleteTask(content._id)}>
          <TrashIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const taskContent: AccordionRenderFC<object, GetTaskResponse> = (_, { content }) => {
  return (
    <View style={styles.content}>
      {/* <Text style={[globalStyles.text]}>{section.content}</Text> */}
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Title</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{content.title}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Description</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{content.description}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Done</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{content.done ? 'Yes' : 'No'}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Starts</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{dayjs(content.starts).format('DD-MM-YYYY by hh:mma')}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Stops</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{dayjs(content.ends).format('DD-MM-YYYY by hh:mma')}</Text>
        </Text>
      </View>
    </View>
  );
};

const Task: FC = () => {
  const user_id = useAppSelector((state) => state.auth.userInfo?.id as string);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const actionModal = useRef<Modal>(null);
  const { data, isFetching, isLoading } = useGetTasksQuery({ user_id });
  const [deleteTask] = useDeleteTaskMutation();
  const actionModalPayload = useRef<{
    actionMode: 'create' | 'edit';
    taskInfo: GetTaskResponse | null;
  }>({
    actionMode: 'create',
    taskInfo: null,
  });
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

  const handleAccordionChange = (newActiveSections: number[]) => {
    setActiveSections(newActiveSections);
  };

  const sections: AccordionSection<GetTaskResponse>[] = data
    ? data.map((item) => ({
        title: item.title,
        content: item,
      }))
    : [];

  const handleDeleteTask = (id: string) => {
    deleteTask({ id });
  };
  return (
    <>
      {(isFetching || isLoading) && (
        <View style={{ marginVertical: 10 }}>
          <ActivityIndicator color="#4845D2" />
        </View>
      )}
      <TaskHeader
        actionModal={actionModal}
        actionModalPayload={actionModalPayload}
        setShouldUpdate={setShouldUpdate}
        hasTask={Array.isArray(data) && data.length > 0}
      />
      <ScrollView style={styles.scrollView}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderSectionTitle={() => <></>}
          renderHeader={(...args) =>
            taskHeader({ handleDeleteTask, actionModalPayload, actionModal, setShouldUpdate }, ...args)
          }
          renderContent={(...args) => taskContent({}, ...args)}
          onChange={handleAccordionChange}
        />
      </ScrollView>
      <TaskActionModal actionModal={actionModal} actionModalPayload={actionModalPayload} shouldUpdate={shouldUpdate} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#dadaf6',
    padding: 15,
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    margin: 0,
    width: wp('100%') - 135,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 0,
    backgroundColor: '#edecfb',
  },
  scrollView: {
    // marginBottom: 60,
  },
  sectionTitle: {
    padding: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: 15,
  },
  listItemChild1: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItemChild2: {
    paddingLeft: 15,
    width: wp('100%') - 135,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 95,
  },
  headerActionBtn: {
    marginLeft: 15,
    borderWidth: 2,
  },
});

export default Task;
