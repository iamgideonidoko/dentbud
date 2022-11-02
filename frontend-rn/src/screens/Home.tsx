import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import PlaneIcon from '../assets/icons/Plane.svg';
import type { DrawerScreenProps } from '../interfaces/helper.interface';
import DentbudTyping from '../components/DentbudTyping';
import { useAppSelector, useAppDispatch } from '../hooks/store.hook';
import { useConverseRasaMutation } from '../store/api/chat.api';
import dayjs from 'dayjs';
import { addToChat /* , undoLastChat */ } from '../store/slice/chat.slice';
import { getGreetTimeOfDay, starterMessages } from '../helpers/general.helper';

const Home: React.FC<DrawerScreenProps> = ({ navigation }) => {
  const chats = useAppSelector((state) => state.chat.chat);
  const userInfo = useAppSelector((state) => state.auth.userInfo);
  const [converseRasa, { isLoading: isConverseRasaLoading }] = useConverseRasaMutation();

  const [inputMessage, setInputMessage] = useState<string>('');

  const dispatch = useAppDispatch();

  // add message to the chat array
  async function sendMessage() {
    try {
      setInputMessage('');
      dispatch(
        addToChat({
          sender: 'user',
          message: inputMessage,
          time: dayjs().toISOString(),
        }),
      );
      await converseRasa({
        name: userInfo?.name as string,
        email: userInfo?.email as string,
        text: inputMessage,
      }).unwrap();
    } catch (err) {
      console.log('chat error => ', err);
      dispatch(
        addToChat({
          sender: 'dentbud',
          message: "Sorry, I can't provide a response at the moment.",
          time: dayjs().toISOString(),
        }),
      );
    }
  }

  useEffect(() => {
    if (chats.length === 0) {
      dispatch(
        addToChat({
          sender: 'dentbud',
          message: starterMessages[Math.floor(Math.random() * chats.length)]
            ?.replace('{user_name}', userInfo?.name?.split(' ')?.[0] ?? '')
            .replace('{greet_time}', getGreetTimeOfDay()),
          time: dayjs().toISOString(),
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader navigation={navigation} />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <FlatList
            style={{ backgroundColor: '#f2f2ff' }}
            inverted={true}
            data={JSON.parse(JSON.stringify(chats)).reverse()}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback>
                <View style={{ marginTop: 10 }}>
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      backgroundColor: item.sender?.toLowerCase() === 'user' ? '#21AD80' : '#4845D2',
                      alignSelf: item.sender?.toLowerCase() === 'user' ? 'flex-end' : 'flex-start',
                      marginHorizontal: 10,
                      padding: 10,
                      borderRadius: 10,
                      borderBottomLeftRadius: item.sender?.toLowerCase() === 'user' ? 10 : 0,
                      borderBottomRightRadius: item.sender?.toLowerCase() === 'user' ? 0 : 8,
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: 'FontRegular',
                      }}
                    >
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        color: '#dfe4ea',
                        fontSize: 12,
                        alignSelf: 'flex-end',
                        marginTop: 4,
                        fontFamily: 'FontRegular',
                      }}
                    >
                      {dayjs(item.time).format('hh:mm')}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
          {isConverseRasaLoading && <DentbudTyping delay={0} />}

          <View style={{ paddingVertical: 10, borderWidth: 0 }}>
            <View style={styles.messageInputView}>
              <TextInput
                defaultValue={inputMessage}
                value={inputMessage}
                style={[styles.messageInput, { fontFamily: 'FontRegular', color: '#00000090' }]}
                placeholder="Start typing..."
                onChangeText={(text) => setInputMessage(text)}
                onSubmitEditing={() => {
                  !isConverseRasaLoading && sendMessage();
                }}
              />
              <TouchableOpacity
                style={styles.messageSendView}
                onPress={() => {
                  !isConverseRasaLoading && sendMessage();
                }}
              >
                <Text style={{ fontFamily: 'FontRegular' }}>
                  <PlaneIcon style={{ opacity: 0.7 }} />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userProfileImage: { height: '100%', aspectRatio: 1, borderRadius: 100 },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#f2f2ff',
  },
  messageInputView: {
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 5,
  },
  messageInput: {
    height: 40,
    flex: 1,
    paddingHorizontal: 10,
  },
  messageSendView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
});

export default Home;
