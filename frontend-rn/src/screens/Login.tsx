import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import DentbudLogo from '../assets/images/dentbud-logo-md.png';
import type { DrawerScreenProps } from '../interfaces/helper.interface';
import SimpleReactValidator from 'simple-react-validator';
import type { LoginUserInput } from '../interfaces/store.interface';
import { useLoginUserMutation } from '../store/api/auth.api';
import { useToast } from 'react-native-toast-notifications';

const Login: React.FC<DrawerScreenProps> = ({ navigation }) => {
  const [input, setInput] = useState<LoginUserInput>({
    email: '',
    password: '',
  });
  const [, forceUpdate] = useState<boolean>(false);
  const [loginUser, { isLoading: isLoggingIn }] = useLoginUserMutation();
  const toast = useToast();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <Text style={styles.formErrorMsg}>{message}</Text>,
    }),
  );

  const handleLogin = async () => {
    if (simpleValidator.current.allValid()) {
      // should login user
      try {
        await loginUser(input).unwrap();
        toast.show('Logged in successfully 😎', { placement: 'top', type: 'success' });
      } catch (err) {
        toast.show(`${(err as { data: { message: string } }).data?.message ?? 'Login failed'} 😔`, {
          placement: 'top',
          type: 'danger',
        });
      }
    } else {
      simpleValidator.current.showMessages();
      forceUpdate((prev) => !prev);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle} />
        <View style={styles.smallCircle} />
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <View style={styles.centerizedView}>
            <View style={styles.authBox}>
              <View style={styles.logoBox}>
                <Image source={DentbudLogo} style={{ width: 60, height: 60, borderRadius: 0 }} />
              </View>
              <Text style={[styles.appName]}>Dentbud</Text>
              <Text style={styles.loginTitleText}>Log in</Text>
              {/* <View style={styles.hr}></View> */}
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize={'none'}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={input.email}
                  onChangeText={(text) => setInput((prev) => ({ ...prev, email: text }))}
                />
                {
                  /* simple validation */
                  simpleValidator.current.message('email', input.email, 'required|email|between:2,50')
                }
              </View>
              <View style={styles.inputBox}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  textContentType="password"
                  value={input.password}
                  onChangeText={(text) => setInput((prev) => ({ ...prev, password: text }))}
                />
                {
                  /* simple validation */
                  simpleValidator.current.message('password', input.password, 'required|between:4,25')
                }
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>{isLoggingIn ? 'Logging in...' : 'Log in'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Don't have an account? Register</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#4845D240',
    borderRadius: 1000,
    position: 'absolute',
    left: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#4845D240',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    left: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    paddingTop: 30,
    paddingBottom: 30,
  },
  authBox: {
    width: '85%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 11.84,
    elevation: 10,
  },
  logoBox: {
    width: 90,
    height: 90,
    //   backgroundColor: "#000000",
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: -15,
  },
  appName: {
    fontSize: 15,
    color: 'black',
    fontFamily: 'FontMedium',
    textAlign: 'center',
  },
  loginTitleText: {
    fontSize: 22,
    marginTop: 10,
    color: 'black',
    fontFamily: 'FontMedium',
    textAlign: 'center',
    //   textAlign: "center"
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
    color: 'black',
    fontFamily: 'FontRegular',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#4845D2',
    marginTop: 30,
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'FontRegular',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    color: 'black',
    fontFamily: 'FontRegular',
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
    color: 'black',
    fontFamily: 'FontRegular',
  },
  formErrorMsg: {
    color: '#a94442',
    borderWidth: 1,
    borderStyle: 'solid',
    marginTop: 8,
    padding: 6,
    borderColor: '#ebccd1',
    backgroundColor: '#f2dede',
    borderRadius: 6,
    fontSize: 12,
  },
});

export default Login;
