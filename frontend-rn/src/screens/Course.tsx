import React, { useState, useRef, RefObject, Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import type { DrawerScreenProps, AccordionRenderFC, AccordionSection } from '../interfaces/helper.interface';
import Accordion from 'react-native-collapsible/Accordion';
import PlusIcon from '../assets/icons/Plus.svg';
import EditIcon from '../assets/icons/Edit.svg';
import NotificationIcon from '../assets/icons/Notification.svg';
import NotificationActiveIcon from '../assets/icons/NotificationActive.svg';
import TrashIcon from '../assets/icons/Trash.svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Modal from 'react-native-modalbox';
import CourseActionModal from '../components/CourseActionModal';
import globalStyles from '../styles/global.style';
import { useGetCoursesQuery, useDeleteCourseMutation } from '../store/api/course.api';
import { useAppSelector } from '../hooks/store.hook';
import type { GetCourseResponse } from '../interfaces/store.interface';
import dayjs from 'dayjs';

const courseSectionTitle: AccordionRenderFC<
  {
    actionModal: RefObject<Modal>;
    actionModalPayload: RefObject<{
      actionMode: 'create' | 'edit';
      courseInfo: GetCourseResponse | null;
    }>;
    setShouldUpdate: Dispatch<SetStateAction<boolean>>;
  },
  GetCourseResponse
> = ({ actionModal, actionModalPayload, setShouldUpdate }, __, index) => {
  if (index !== 0) return <></>;
  const handleModalOpen = () => {
    if (actionModalPayload.current) {
      actionModalPayload.current.actionMode = 'create';
      actionModalPayload.current.courseInfo = null;
      setShouldUpdate((prev) => !prev);
      actionModal.current?.open();
    }
  };
  return (
    <View style={styles.sectionTitle}>
      <Text style={[globalStyles.text]}>Here are all your courses:</Text>
      <TouchableWithoutFeedback onPress={() => handleModalOpen()}>
        <PlusIcon width={25} height={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const courseHeader: AccordionRenderFC<
  {
    handleDeleteCourse: (id: string) => void;
    actionModalPayload: RefObject<{
      actionMode: 'create' | 'edit';
      courseInfo: GetCourseResponse | null;
    }>;
    actionModal: RefObject<Modal>;
    setShouldUpdate: Dispatch<SetStateAction<boolean>>;
  },
  GetCourseResponse
> = ({ handleDeleteCourse, actionModalPayload, actionModal, setShouldUpdate }, { title, content }, __, isActive) => {
  const handleEditPress = () => {
    if (actionModalPayload.current) {
      actionModalPayload.current.actionMode = 'edit';
      actionModalPayload.current.courseInfo = content;
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
        <TouchableWithoutFeedback onPress={() => handleDeleteCourse(content._id)}>
          <TrashIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const courseContent: AccordionRenderFC<object, GetCourseResponse> = (_, { content }) => {
  return (
    <View style={styles.content}>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Course Name</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{content.course_name}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Course Code</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{content.course_code}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Exam Starts</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{dayjs(content.exam_starts).format('DD-MM-YYYY by hh:mma')}</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Exam Ends</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>{dayjs(content.exam_ends).format('DD-MM-YYYY by hh:mma')}</Text>
        </Text>
      </View>
    </View>
  );
};

const Course: React.FC<DrawerScreenProps> = ({ navigation }) => {
  const user_id = useAppSelector((state) => state.auth.userInfo?.id as string);
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const actionModal = useRef<Modal>(null);
  const { data, isFetching, isLoading } = useGetCoursesQuery({ user_id });
  const [deleteCourse] = useDeleteCourseMutation();
  const actionModalPayload = useRef<{
    actionMode: 'create' | 'edit';
    courseInfo: GetCourseResponse | null;
  }>({
    actionMode: 'create',
    courseInfo: null,
  });
  const [shouldUpdate, setShouldUpdate] = useState<boolean>(false);

  const handleAccordionChange = (newActiveSections: number[]) => {
    setActiveSections(newActiveSections);
  };

  const sections: AccordionSection<GetCourseResponse>[] = data
    ? data.map((item) => ({
        title: item.course_code,
        content: item,
      }))
    : [];

  const handleDeleteCourse = (id: string) => {
    deleteCourse({ id });
  };

  return (
    <View>
      <CustomHeader navigation={navigation} title="Course" />
      {(isFetching || isLoading) && (
        <View style={{ marginVertical: 10 }}>
          <ActivityIndicator color="#4845D2" />
        </View>
      )}
      <ScrollView style={styles.scrollView}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderSectionTitle={(...args) =>
            courseSectionTitle({ actionModal, actionModalPayload, setShouldUpdate }, ...args)
          }
          renderHeader={(...args) =>
            courseHeader({ handleDeleteCourse, actionModalPayload, actionModal, setShouldUpdate }, ...args)
          }
          renderContent={(...args) => courseContent({}, ...args)}
          onChange={handleAccordionChange}
        />
      </ScrollView>

      <CourseActionModal
        actionModal={actionModal}
        actionModalPayload={actionModalPayload}
        shouldUpdate={shouldUpdate}
      />
    </View>
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
    marginBottom: 60,
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

export default Course;
