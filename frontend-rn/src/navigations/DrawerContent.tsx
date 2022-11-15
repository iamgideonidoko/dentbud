import React from 'react';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
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
import DentbudLogo from '../assets/images/dentbud-logo-md.png';
import MaleAvatar from '../assets/images/male-avatar.png';
import CalendarIcon from '../assets/icons/Calendar.svg';
import ChatIcon from '../assets/icons/Chat.svg';
import BackIcon from '../assets/icons/Back.svg';
import CogIcon from '../assets/icons/Cog.svg';
import FolderIcon from '../assets/icons/Folder.svg';
import { useAppSelector } from '../hooks/store.hook';
import { useLogoutUserMutation } from '../store/api/auth.api';
import { useToast } from 'react-native-toast-notifications';
import globalStyles from '../styles/global.style';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({ navigation }) => {
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [logoutUser] = useLogoutUserMutation();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      toast.show('Logged you out...', { placement: 'top', type: 'warning' });
      await logoutUser({ user_id: userInfo?.id as string }).unwrap();
      toast.show('Logged out successfully 😎', { placement: 'top', type: 'success' });
    } catch (err) {
      toast.show('Could not log you out 😔', { placement: 'top', type: 'danger' });
    }
  };

  return (
    <SafeAreaView style={{ borderWidth: 0, flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            borderWidth: 0,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              borderWidth: 0,
              position: 'absolute',
              top: 0,
              right: -5,
              borderRadius: 100,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation?.closeDrawer()}
              style={{ position: 'absolute', top: 20, left: 0 }}
            >
              <BackIcon />
            </TouchableWithoutFeedback>
          </View>
          <Image source={DentbudLogo} style={{ width: 100, height: 100 }} />
          <Text style={[globalStyles.text, styles.appName]}>Dentbud</Text>
          <Text style={[globalStyles.text, styles.miniAppName]}>...your favourite assistant</Text>
        </View>
        <View style={styles.profileCard}>
          <Text style={[globalStyles.text, styles.profileCardTitle]}>Your Profile:</Text>
          <View style={{ alignItems: 'center' }}>
            <Image source={MaleAvatar} style={{ width: 50, height: 50, marginRight: 10 }} />
            <Text style={[globalStyles.text, styles.fullname]}>{userInfo?.name}</Text>
          </View>
          <View style={styles.usernameWrapper}>
            <Text style={[globalStyles.text, styles.username]}>{userInfo?.email}</Text>
          </View>
          <Text style={[globalStyles.text, styles.logoutText]} onPress={handleLogout}>
            Log out
          </Text>
        </View>
        <View style={styles.navItemsWrapper}>
          <View style={[styles.navItem, { backgroundColor: '#4845D220' }]}>
            <View>
              <ChatIcon />
              <Text style={[globalStyles.text, styles.navItemText]}>Interact with your assistant</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={[styles.navItemBtn, { backgroundColor: '#4845D230' }]}
            >
              <Text style={[globalStyles.text, styles.navItemBtnText, { color: '#4845D2' }]}>Chat</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.navItem, { backgroundColor: '#21AD8020' }]}>
            <View>
              <FolderIcon />
              <Text style={[globalStyles.text, styles.navItemText]}>Manage your Courses</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Course')}
              style={[styles.navItemBtn, { backgroundColor: '#21AD8030' }]}
            >
              <Text style={[globalStyles.text, styles.navItemBtnText, { color: '#21AD80' }]}>Courses</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.navItemsWrapper, { paddingBottom: 50 }]}>
          <View style={[styles.navItem, { backgroundColor: '#4845D220' }]}>
            <View>
              <CalendarIcon />
              <Text style={[globalStyles.text, styles.navItemText]}>Manage your activities</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Activity')}
              style={[styles.navItemBtn, { backgroundColor: '#4845D230' }]}
            >
              <Text style={[globalStyles.text, styles.navItemBtnText, { color: '#4845D2' }]}>Activity</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.navItem, { backgroundColor: '#21AD8020' }]}>
            <View>
              <CogIcon />
              <Text style={[globalStyles.text, styles.navItemText]}>Configure app settings</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Setting')}
              style={[styles.navItemBtn, { backgroundColor: '#21AD8030' }]}
            >
              <Text style={[globalStyles.text, styles.navItemBtnText, { color: '#21AD80' }]}>Setttings</Text>
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
    fontFamily: 'FontMedium',
    fontSize: 28,
    marginTop: 10,
  },
  miniAppName: {
    fontFamily: 'FontRegular',
    marginTop: 2,
  },
  profileCard: {
    height: 210,
    width: '100%',
    backgroundColor: '#4845D2',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  profileCardTitle: {
    color: 'white',
    fontFamily: 'FontRegular',
    fontSize: 15,
    marginBottom: 5,
  },
  fullname: {
    fontFamily: 'FontMedium',
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
    fontFamily: 'FontBold',
  },
  navItemsWrapper: {
    flex: 1,
    flexDirection: 'row',
    flewWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 35,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  navItem: {
    // width: '45%',
    width: '45%',
    padding: 20,
    borderRadius: 15,
    height: '100%',
    justifyContent: 'space-between',
  },
  navItemText: {
    fontFamily: 'FontBold',
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
    fontFamily: 'FontMedium',
  },
  logoutText: {
    margin: 13,
    color: 'white',
  },
});

export default DrawerContent;
