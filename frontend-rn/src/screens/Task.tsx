import React, { useState, useRef } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import type { AccordionRenderFC, AccordionSection } from '../interfaces/helper.interface';
import Accordion from 'react-native-collapsible/Accordion';
import type { FC, RefObject } from 'react';
import PlusIcon from '../assets/icons/Plus.svg';
import EditIcon from '../assets/icons/Edit.svg';
import NotificationIcon from '../assets/icons/Notification.svg';
import NotificationActiveIcon from '../assets/icons/NotificationActive.svg';
import TrashIcon from '../assets/icons/Trash.svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import globalStyles from '../styles/global.style';
import TaskActionModal from '../components/TaskActionModal';
import Modal from 'react-native-modalbox';

const taskSectionTitle: AccordionRenderFC<{ actionModal: RefObject<Modal> }> = ({ actionModal }, __, index) => {
  if (index !== 0) return <></>;
  return (
    <View style={styles.sectionTitle}>
      <Text style={[globalStyles.text]}>Here are all your tasks:</Text>
      <TouchableWithoutFeedback onPress={() => actionModal.current?.open()}>
        <PlusIcon width={25} height={25} />
      </TouchableWithoutFeedback>
    </View>
  );
};

const taskHeader: AccordionRenderFC = (_, section, __, isActive) => {
  return (
    <View style={[styles.header, { backgroundColor: isActive ? '#4845d2' : '#dadaf6' }]}>
      <Text style={[globalStyles.text, styles.headerText, { color: isActive ? 'white' : '#070715' }]}>
        {section.title}
      </Text>
      <View style={styles.headerActions}>
        <TouchableWithoutFeedback onPress={() => console.log('trigger notification')}>
          {true ? (
            <NotificationIcon style={styles.headerActionBtn} width={20} height={20} />
          ) : (
            <NotificationActiveIcon style={styles.headerActionBtn} width={20} height={20} />
          )}
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('trigger edit')}>
          <EditIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => console.log('trigger delete')}>
          <TrashIcon style={styles.headerActionBtn} width={20} height={20} />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const taskContent: AccordionRenderFC = (_, section) => {
  return (
    <View style={styles.content}>
      {/* <Text style={[globalStyles.text]}>{section.content}</Text> */}
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Title</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>Operating System</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Description</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>Lorem, ipsum dolor sit amet consectetur adipisicing!</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Starts</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>10-10-2022 by 11:30am</Text>
        </Text>
      </View>
      <View style={styles.listItem}>
        <View style={styles.listItemChild1}>
          <Text style={[globalStyles.text]}>Stops</Text>
          <Text style={[globalStyles.text]}>: </Text>
        </View>
        <Text style={[globalStyles.text, styles.listItemChild2]}>
          <Text style={[globalStyles.text]}>10-10-2022 by 11:30am</Text>
        </Text>
      </View>
    </View>
  );
};

const Task: FC = () => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [sections] = useState<AccordionSection[]>([
    {
      title: 'First',
      content: 'First Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Second Lorem ipsum...',
    },
    {
      title: 'Third',
      content: 'Third Lorem ipsum...',
    },
  ]);
  const actionModal = useRef<Modal>(null);

  const handleAccordionChange = (newActiveSections: number[]) => {
    setActiveSections(newActiveSections);
  };
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderSectionTitle={(...args) => taskSectionTitle({ actionModal }, ...args)}
          renderHeader={(...args) => taskHeader({}, ...args)}
          renderContent={(...args) => taskContent({}, ...args)}
          onChange={handleAccordionChange}
        />
      </ScrollView>
      <TaskActionModal actionModal={actionModal} />
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
