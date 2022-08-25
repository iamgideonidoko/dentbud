import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import PlaneIcon from '../assets/icons/Plane.svg';
import {useSelector, useDispatch} from 'react-redux';

const Home = ({navigation}) => {
  const chats = useSelector(state => state.chat.chat);

  const [inputMessage, setInputMessage] = useState('');

  // add message to the chat array
  function sendMessage() {
    console.log('Sending message');

    // setInputMessage('');
  }

  return (
    <View style={{flex: 1}}>
      <CustomHeader navigation={navigation} />

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <FlatList
            style={{backgroundColor: '#f2f2ff'}}
            inverted={true}
            data={JSON.parse(JSON.stringify(chats)).reverse()}
            renderItem={({item}) => (
              <TouchableWithoutFeedback>
                <View style={{marginTop: 10}}>
                  <View
                    style={{
                      maxWidth: Dimensions.get('screen').width * 0.8,
                      backgroundColor:
                        item.sender === 'User' ? '#21AD80' : '#4845D2',
                      alignSelf:
                        item.sender === 'User' ? 'flex-end' : 'flex-start',
                      marginHorizontal: 10,
                      padding: 10,
                      borderRadius: 10,
                      borderBottomLeftRadius: item.sender === 'User' ? 10 : 0,
                      borderBottomRightRadius: item.sender === 'User' ? 0 : 8,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontFamily: 'Euclid Circular A Regular',
                      }}>
                      {item.message}
                    </Text>
                    <Text
                      style={{
                        color: '#dfe4ea',
                        fontSize: 12,
                        alignSelf: 'flex-end',
                        marginTop: 4,
                        fontFamily: 'Euclid Circular A Regular',
                      }}>
                      {item.time}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          />

          <View style={{paddingVertical: 10, borderWidth: 0}}>
            <View style={styles.messageInputView}>
              <TextInput
                defaultValue={inputMessage}
                style={[
                  styles.messageInput,
                  {fontFamily: 'Euclid Circular A Regular', color: '#00000090'},
                ]}
                placeholder="Message"
                onChangeText={text => setInputMessage(text)}
                onSubmitEditing={() => {
                  sendMessage();
                }}
              />
              <TouchableOpacity
                style={styles.messageSendView}
                onPress={() => {
                  sendMessage();
                }}>
                <Text style={{fontFamily: 'Euclid Circular A Regular'}}>
                  <PlaneIcon style={{opacity: 0.7}} />
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
  userProfileImage: {height: '100%', aspectRatio: 1, borderRadius: 100},
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
