import { useState, useRef, useEffect } from 'react';
import { Modal, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loader from '../components/Loader';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup.string().required('Password is required'),
});


export default function Login() {

  const navigation = useNavigation();
  const [showAlert, setShowAlert] = useState(false)
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  async function getToken() {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log(value);
      // if (value == null) {
      // } else {
      //   navigation.replace('BottomTabs');
      // }
    } catch (e) {
      // error reading value
    }
  }

  // getToken();
  async function storeToken(value) {
    try {
      if (value != undefined) {
        await AsyncStorage.setItem('token', value);
      }
    } catch (e) {
      // saving error
    }
  }
  useEffect(() => {
    getToken();
    firstRef.current.value = '';
    lastRef.current.value = '';
  });
  async function postJSON(data, values) {
    try {
      setLoading(true);
      const response = await fetch(
        'https://custom.mystagingserver.site/parcel_safe_app/public/api/auth/login',
        {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      );
      const result = await response.json();
      setLoading(false);
      if (result.status == 'Success') {
        values.email = '';
        values.password = '';
        await storeToken(result.data.token);
        ToastAndroid.show('Logged In Successfully!', ToastAndroid.SHORT);
        navigation.replace('BottomTabs');

      } else {
        setShowAlert(!showAlert);
        setErrortext(result.message);
      }
      console.log('Success:', result);
      return result;

    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  }
  const [hidePassword, setHidePassword] = useState(true);
  const managePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };

  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <Loader loading={loading} />
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={values => {
          // console.log(email, password);
          data = { email: values.email, password: values.password };
          postJSON(data, values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <>
            <View style={styles.container}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginBottom: 30,
                  textAlign: 'center',
                  color: '#1C1C1C',
                  fontFamily: 'Poppins-Regular',
                }}>
                Sign In
              </Text>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.TextInput}
                  name="email"
                  placeholder="Enter Email"
                  placeholderTextColor="#696969"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    // lastRef.current?.focus()
                    // this.secondTextInput.focus();
                  }}
                  ref={firstRef}
                />
              </View>
              {errors.email && touched.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <View style={styles.inputPassword}>
                <TextInput
                  style={styles.TextInput}
                  name="password"
                  placeholder="Password"
                  placeholderTextColor="#858585"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={hidePassword}
                  autoCompleteType="password"
                  enablesReturnKeyAutomatically
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  ref={lastRef}
                // ref={input => {
                //   this.secondTextInput = input;
                // }}
                />
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.visibilityBtn}
                  onPress={managePasswordVisibility}>
                  <Image
                    source={
                      hidePassword
                        ? require('../assets/images/hide.png')
                        : require('../assets/images/show.png')
                    }
                    style={styles.btnImage}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && touched.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                onPress={() => navigation.navigate('forgotPassword')}>
                <Text style={styles.forgot_button}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={styles.signup_button}
                  onPress={() => navigation.navigate('signup')}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <Modal
              transparent={true}
              statusBarTranslucent={true}
              animationType={'none'}
              visible={showAlert}
              onRequestClose={() => {
                console.log('close modal');
              }}
            >
              <View style={styles.modalBackground}>
                <View style={styles.modalView}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEC217', width: 40, height: 40, borderRadius: 30 }}>
                    <FontAwesomeIcons name="exclamation" size={20} color={'#1C1C1C'} />
                  </View>
                  <Text style={{ color: '#393939', fontSize: 16, textAlign: 'center', marginTop: 15 }}>{errortext}</Text>
                  <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around', width: '90%', marginTop: -25 }}>
                    <Pressable style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 40,
                      backgroundColor: '#EEC217',
                      borderRadius: 10,
                      width: 80,
                      height: 40
                    }} onPress={() => { setShowAlert(!showAlert); }}>
                      <Text style={{ color: '#393939', fontSize: 13 }}>Ok</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },

  inputView: {
    borderWidth: 1,
    borderColor: '#696969',
    borderRadius: 30,
    width: '100%',
    height: 45,
    marginBottom: 20,
    textAlign: 'right',
  },

  TextInput: {
    height: 45,
    flex: 1,
    padding: 14,
    marginLeft: 20,
    color: '#1C1C1C',
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
    textAlign: 'right',
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  loginBtn: {
    width: '100%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#EEC217',
    borderColor: '#858585',
    borderWidth: 1,
  },
  loginText: {
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  signup_button: {
    height: 30,
    marginTop: 30,
    textAlign: 'center',
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  inputPassword: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#696969',
    borderRadius: 30,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 20,
    fontFamily: 'Poppins-Regular',
  },
  btnImage: {
    width: 25,
    height: 25,
  },
  visibilityBtn: {
    paddingRight: 10
  },
  errorlogin: {
    color: "#1C1C1C",
    fontFamily: 'Poppins-Regular',
    paddingTop: 20
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  modalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: 260,
    height: 190,
  },
});
