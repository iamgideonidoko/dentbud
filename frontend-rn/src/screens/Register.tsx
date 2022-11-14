import React, { useState, useRef } from 'react';
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
// import { widthPercentageToDP as wp, height } from 'react-native-responsive-screen';
import type { RegisterUserInput } from '../interfaces/store.interface';
import { useRegisterUserMutation } from '../store/api/user.api';
import SimpleReactValidator from 'simple-react-validator';
import { useToast } from 'react-native-toast-notifications';
import globalStyles from '../styles/global.style';

const Register: React.FC<DrawerScreenProps> = ({ navigation }) => {
  const [registerUser, { isLoading: isRegistering }] = useRegisterUserMutation();
  const [input, setInput] = useState<RegisterUserInput>({
    name: '',
    email: '',
    password: '',
    retype_password: '',
  });
  const [, forceUpdate] = useState<boolean>(false);
  const toast = useToast();

  const simpleValidator = useRef(
    new SimpleReactValidator({
      element: (message: string) => <Text style={globalStyles.formErrorMsg}>{message}</Text>,
      validators: {
        password_match: {
          message: 'The :attribute must match password',
          rule: (val, params) => val === params[0],
        },
      },
    }),
  );

  const handleRegister = async () => {
    if (simpleValidator.current.allValid()) {
      try {
        await registerUser(input).unwrap();
        toast.show('Registered successfully 😎', { placement: 'top', type: 'success' });
      } catch (err) {
        toast.show(`${(err as { data: { message: string } }).data?.message ?? 'Register failed'} 😔`, {
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
              <Text style={[globalStyles.text, styles.appName]}>Dentbud</Text>
              <Text style={[globalStyles.text, styles.loginTitleText]}>Register</Text>
              <View style={styles.inputBox}>
                <Text style={[globalStyles.text, styles.inputLabel]}>Name</Text>
                <TextInput
                  style={[globalStyles.text, styles.input]}
                  autoCapitalize={'none'}
                  keyboardType="name-phone-pad"
                  textContentType="name"
                  value={input.name}
                  onChangeText={(text) => setInput((prev) => ({ ...prev, name: text }))}
                />
                {
                  /* simple validation */
                  simpleValidator.current.message('name', input.name, 'required|alpha_space|between:4,25')
                }
              </View>
              <View style={styles.inputBox}>
                <Text style={[globalStyles.text, styles.inputLabel]}>Email</Text>
                <TextInput
                  style={[globalStyles.text, styles.input]}
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
                <Text style={[globalStyles.text, styles.inputLabel]}>Password</Text>
                <TextInput
                  style={[globalStyles.text, styles.input]}
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
              <View style={styles.inputBox}>
                <Text style={[globalStyles.text, styles.inputLabel]}>Retype Password</Text>
                <TextInput
                  style={[globalStyles.text, styles.input]}
                  autoCapitalize="none"
                  secureTextEntry={true}
                  textContentType="password"
                  value={input.retype_password}
                  onChangeText={(text) => setInput((prev) => ({ ...prev, retype_password: text }))}
                />
                {
                  /* simple validation */
                  simpleValidator.current.message(
                    'retyped password',
                    input.retype_password,
                    `required|between:4,25|password_match:${input.password}`,
                  )
                }
              </View>
              <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
                <Text style={[globalStyles.text, styles.loginButtonText]}>
                  {isRegistering ? 'Registering...' : 'Register'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[globalStyles.text, styles.registerText]}>Have an account? Log in</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
            <Text style={[globalStyles.text, styles.forgotPasswordText]}>Forgot Password?</Text>
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
});

export default Register;
