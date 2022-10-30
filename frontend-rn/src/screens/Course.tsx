/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomHeader from '../components/CustomHeader';
import type { DrawerScreenProps, AccordionRenderFC, AccordionSection } from '../interfaces/helper.interface';
import Accordion from 'react-native-collapsible/Accordion';

const courseSectionTitle: AccordionRenderFC = (_, __, index) => {
  if (index !== 0) return <></>;
  return (
    <View style={styles.sectionTitle}>
      <Text>Below are the courses you're currently offering:</Text>
    </View>
  );
};

const courseHeader: AccordionRenderFC = (_, section, __, isActive) => {
  return (
    <View style={[styles.header, { backgroundColor: isActive ? '#4845d2' : '#dadaf6' }]}>
      <Text style={[styles.headerText, { color: isActive ? 'white' : '#070715' }]}>{section.title}</Text>
    </View>
  );
};

const courseContent: AccordionRenderFC = (_, section) => {
  return (
    <View style={styles.content}>
      <Text>{section.content}</Text>
    </View>
  );
};

const Course: React.FC<DrawerScreenProps> = ({ navigation }) => {
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

  const handleAccordionChange = (newActiveSections: any) => {
    console.log('active sections => ', newActiveSections);
    setActiveSections(newActiveSections);
  };
  return (
    <View>
      <CustomHeader navigation={navigation} title="Course" />
      <ScrollView style={styles.scrollView}>
        <Accordion
          sections={sections}
          activeSections={activeSections}
          renderSectionTitle={(...args) => courseSectionTitle({}, ...args)}
          renderHeader={(...args) => courseHeader({}, ...args)}
          renderContent={(...args) => courseContent({}, ...args)}
          onChange={handleAccordionChange}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#dadaf6',
    padding: 10,
    margin: 0,
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    margin: 0,
  },
  content: {
    padding: 20,
    margin: 0,
    backgroundColor: '#edecfb',
  },
  scrollView: {
    marginBottom: 60,
  },
  sectionTitle: {
    padding: 10,
    paddingVertical: 20,
  },
});

export default Course;
