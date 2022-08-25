import React from 'react';
// import Container from '../components/Container'
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import DentBudLogo from '../assets/images/dentbud-logo-md.png';
import MaleAvatar from '../assets/images/male-avatar.png';
import CalendarIcon from '../assets/icons/Calendar.svg';
import ChatIcon from '../assets/icons/Chat.svg';
import BackIcon from '../assets/icons/Back.svg';

const DrawerContent = ({navigation}) => {
  return (
    <SafeAreaView style={{borderWidth: 0, flex: 1}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            borderWidth: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}>
          <View
            style={{
              borderWidth: 0,
              position: 'absolute',
              top: 0,
              right: -5,
              borderRadius: 100,
            }}>
            <TouchableWithoutFeedback
              onPress={() => navigation?.closeDrawer()}
              style={{position: 'absolute', top: 20, left: 0}}>
              <BackIcon />
            </TouchableWithoutFeedback>
          </View>
          <Image source={DentBudLogo} style={{width: 100, height: 100}} />
          <Text style={styles.appName}>DentBud</Text>
          <Text style={styles.miniAppName}>...your favourite assistant</Text>
        </View>
        <View style={styles.profileCard}>
          <Text style={styles.profileCardTitle}>Your Profile:</Text>
          <View style={{alignItems: 'center'}}>
            <Image
              source={MaleAvatar}
              style={{width: 50, height: 50, marginRight: 10}}
            />
            <Text style={styles.fullname}>John Doe</Text>
          </View>
          <View style={styles.usernameWrapper}>
            <Text style={styles.username}>@johndoe</Text>
          </View>
        </View>
        <View style={styles.navItemsWrapper}>
          <View style={[styles.navItem, {backgroundColor: '#4845D220'}]}>
            <ChatIcon />
            <Text style={[styles.navItemText]}>Chat your assistant</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={[styles.navItemBtn, {backgroundColor: '#4845D230'}]}>
              <Text style={[styles.navItemBtnText, {color: '#4845D2'}]}>
                Chat
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.navItem, {backgroundColor: '#21AD8020'}]}>
            <CalendarIcon />
            <Text style={[styles.navItemText]}>Manage your Courses</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Course')}
              style={[styles.navItemBtn, {backgroundColor: '#21AD8030'}]}>
              <Text style={[styles.navItemBtnText, {color: '#21AD80'}]}>
                Courses
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.navItemsWrapper, {paddingBottom: 50}]}>
          <View style={[styles.navItem, {backgroundColor: '#4845D220'}]}>
            <ChatIcon />
            <Text style={[styles.navItemText]}>Structure your timetable</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Timetable')}
              style={[styles.navItemBtn, {backgroundColor: '#4845D230'}]}>
              <Text style={[styles.navItemBtnText, {color: '#4845D2'}]}>
                Timetable
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.navItem, {backgroundColor: '#21AD8020'}]}>
            <CalendarIcon />
            <Text style={[styles.navItemText]}>All of your activites</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Activity')}
              style={[styles.navItemBtn, {backgroundColor: '#21AD8030'}]}>
              <Text style={[styles.navItemBtnText, {color: '#21AD80'}]}>
                Activities
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appName: {
    color: 'black',
    fontFamily: 'Euclid Circular A SemiBold',
    fontSize: 28,
    marginTop: 10,
  },
  miniAppName: {
    fontFamily: 'Euclid Circular A Regular',
    marginTop: 2,
  },
  profileCard: {
    height: 180,
    width: '100%',
    backgroundColor: '#4845D2',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  profileCardTitle: {
    color: 'white',
    fontFamily: 'Euclid Circular A Regular',
    fontSize: 15,
    marginBottom: 5,
  },
  fullname: {
    fontFamily: 'Euclid Circular A Medium',
    color: 'white',
    fontSize: 20,
  },
  usernameWrapper: {
    backgroundColor: '#ffffff40',
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    padding: 10,
    borderRadius: 100,
  },
  username: {
    color: 'black',
    fontFamily: 'Euclid Circular A Bold',
  },
  navItemsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flewWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navItem: {
    width: '45%',
    padding: 20,
    borderRadius: 15,
  },
  navItemText: {
    fontFamily: 'Euclid Circular A Bold',
    marginTop: 5,
    marginBottom: 5,
    color: '#00000090',
  },
  navItemBtn: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 4,
  },
  navItemBtnText: {
    fontFamily: 'Euclid Circular A Medium',
  },
});

export default DrawerContent;
