import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, StatusBar, Modal, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function AccountSetting() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledNumVerified, setIsDisabledNumVerified] = useState(false);
  const [success_msg, setSuccess_msg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setInputName] = useState();
  const [email, setInputEmail] = useState();
  const [address_1, setInputAddress1] = useState();
  const [address_2, setInputAddress2] = useState();
  const [city, setInputCity] = useState();
  const [country_name, setInputCountry] = useState('');
  const [postal_code, setInputPostalCode] = useState();
  const [defaultCountryIndex, setDefaultCountryIndex] = useState(0);
  const [number, setNumber] = useState();
  const [verificationStatus, setVerificationStatus] = useState();
  const [verificationStatusError, setVerificationStatusError] = useState(true);
  const [verificationOtp, setVerificationOtp] = useState(false);
  const [verificationOtpMobile, setVerificationOtpMobile] = useState(false);
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '']);
  const [inputErrors, setInputErrors] = useState([false, false, false, false, false]);
  const [emailVerified, setEmailVerified] = useState(false)
  const [numberVerified, setNumberVerified] = useState()
  const [nameEditMode, setNameEditMode] = useState(false);
  const [emailEditMode, setEmailEditMode] = useState(false);
  const [address1EditMode, setAdress1EditMode] = useState(false);
  const [address2EditMode, setAdress2EditMode] = useState(false);
  const [cityEditMode, setCityEditMode] = useState(false);
  const [postalcodeEditMode, setPostalCodeEditMode] = useState(false);
  const [numberEditMode, setNumberEditMode] = useState(false);





  const digitInputs = useRef([]);


  const handleOtpChange = (index, value) => {
    if (/^[0-9]*$/.test(value) && value.length <= 1) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      setInputErrors([...inputErrors.slice(0, index), false, ...inputErrors.slice(index + 1)]);
      // Move focus to the next input after entering a digit
      if (index < digitInputs.current.length - 1 && value !== '') {
        digitInputs.current[index + 1].focus();
      }
    }
  };

  const countries = ["United States", "Canada"];
  const countriesWithFlags = [
    { title: 'United States', image: require('../assets/images/us.png') },
    { title: 'Canada', image: require('../assets/images/ca.png') },
  ];
  const apiUrl = 'https://custom.mystagingserver.site/parcel_safe_app/public/api/me';
  const apiUpdate_url = 'https://custom.mystagingserver.site/parcel_safe_app/public/api/auth/useredit';

  const fetchData = async () => {
    try {
      const csrfToken = await AsyncStorage.getItem('token');
      console.log(csrfToken);
      // setCsrfToken(value);
      setLoading(true);
      console.log('csrfToken: ', csrfToken);
      if (csrfToken !== '') {
        axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${csrfToken}`
          }
        }
        )
          .then(response => {
            setLoading(false);
            // console.log(response);
            const responseData = response.data;
            // console.log(responseData);
            // console.log(responseData);
            setInputName(responseData.name);
            setInputEmail(responseData.email);
            setInputAddress1(responseData.address_1);
            setInputAddress2(responseData.address_2);
            setInputCountry(responseData.country)
            setInputPostalCode(responseData.postal_code);
            setInputCity(responseData.city);
            setNumber(responseData.number);
            console.log('Success');
            if (String(responseData.country) !== '') {
              setDefaultCountryIndex(countriesWithFlags.findIndex(cnts => cnts.title == String(responseData.country)));
            }
            if (responseData.email_verified_at == null) {
              setEmailVerified("Not Verified", responseData);


            }
            else {
              setEmailVerified("Verified", responseData);
              setIsDisabled(true);
            }
            if (responseData.mobile_verified_at == null) {
              setNumberVerified("Not Verified", responseData);

            }
            else {
              setNumberVerified("Verified", responseData);
              setIsDisabledNumVerified(true);
            }
          })
          .catch(error => {
            setLoading(false);
            console.error('API request error:', error);
          });
      }
    }
    catch (e) {
      console.log('Root TC error: ', e);
    }
  };
  const updateData = async () => {
    try {
      const csrfToken = await AsyncStorage.getItem('token');
      if (csrfToken !== '') {
        const updatedData = {
          name,
          email,
          address_1,
          address_2,
          city,
          country: country_name,
          postal_code,
          number
        };
        axios.post(apiUpdate_url, updatedData, {
          headers: {
            Authorization: `Bearer ${csrfToken}`
          }
        })
          .then(response => {
            setLoading(!loading);
            setSuccess_msg(!success_msg);
            console.log('Records updated successfully:', response.data);
            setVerificationStatus(response.data.message);
            // You might want to refresh the data after updating
            fetchData();
          })

          .catch(error => {
            console.error('API request error:', error);
          });
      }
    } catch (error) {
      console.log('Update data error:', error);
    }
  };


  const sendVerificationEmail = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const csrfToken = await AsyncStorage.getItem('token');
      if (csrfToken) {
        const headers = {
          Authorization: `Bearer ${csrfToken}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.post(
          'https://custom.mystagingserver.site/parcel_safe_app/public/api/send-me-verification-code',
          { email: email },
          { headers }
        );
        console.log(response.data);
        setVerificationOtp(true);
      } else {
        console.log('Token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  const sendVerificationNumber = async () => {
    try {
      // Retrieve the token from AsyncStorage
      const csrfToken = await AsyncStorage.getItem('token');

      if (csrfToken) {
        const headers = {
          Authorization: `Bearer ${csrfToken}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.post(
          'https://custom.mystagingserver.site/parcel_safe_app/public/api/send-me-mobile-code',
          { number: number },
          { headers }
        );

        console.log(response.data);
        setVerificationOtpMobile(true);
      } else {
        console.log('Token not found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };
  const verifyOTPMobile = async () => {
    // Check for empty digits and set input errors
    const newInputErrors = otpDigits.map(digit => digit === '');
    setInputErrors(newInputErrors);

    // Proceed if no input errors and all OTP digits are filled
    if (!newInputErrors.includes(true) && otpDigits.every(digit => digit !== '')) {
      try {
        // Join OTP digits into a single code
        const otpCode = otpDigits.join('');

        // Retrieve the token from AsyncStorage
        const csrfToken = await AsyncStorage.getItem('token');

        if (csrfToken) {
          const headers = {
            Authorization: `Bearer ${csrfToken}`,
            'Content-Type': 'application/json',
          };

          const response = await axios.post(
            'https://custom.mystagingserver.site/parcel_safe_app/public/api/verify-code',
            { code: otpCode, type: "mobile" },

            { headers }
          );
          if (response.data.status == 1) {
            setVerificationStatus(response.data.msg);
            setSuccess_msg(!success_msg);
            setVerificationOtpMobile(!verificationOtpMobile);
          }
          else {
            setVerificationStatusError(response.data.error);
            console.log(verificationStatusError);
          }

        } else {
          console.log('Token not found in AsyncStorage');
        }
      } catch (error) {

        console.error('Error verifying OTP:', error);
        setVerificationStatus('Error verifying OTP. Please try again.');
      } finally {
        // Clear the OTP digits after verification attempt
        setOtpDigits(['', '', '', '', '']);
      }
    }
  };
  const verifyOTP = async () => {
    // Check for empty digits and set input errors
    const newInputErrors = otpDigits.map(digit => digit === '');
    setInputErrors(newInputErrors);

    // Proceed if no input errors and all OTP digits are filled
    if (!newInputErrors.includes(true) && otpDigits.every(digit => digit !== '')) {
      try {
        // Join OTP digits into a single code
        const otpCode = otpDigits.join('');

        // Retrieve the token from AsyncStorage
        const csrfToken = await AsyncStorage.getItem('token');

        if (csrfToken) {
          const headers = {
            Authorization: `Bearer ${csrfToken}`,
            'Content-Type': 'application/json',
          };

          const response = await axios.post(
            'https://custom.mystagingserver.site/parcel_safe_app/public/api/verify-code',
            { code: otpCode, type: "email" },

            { headers }
          );
          if (response.data.status == 1) {
            setVerificationStatus(response.data.msg);
            setSuccess_msg(!success_msg);
            setVerificationOtp(!verificationOtp);
            fetchData();
            setLoading(!loading);
          }
          else {
            setVerificationStatusError(response.data.error);
            console.log(verificationStatusError);
          }

        } else {
          console.log('Token not found in AsyncStorage');
        }
      } catch (error) {

        console.error('Error verifying OTP:', error);
        setVerificationStatus('Error verifying OTP. Please try again.');
      } finally {
        // Clear the OTP digits after verification attempt
        setOtpDigits(['', '', '', '', '']);
      }
    }
  };
  useEffect(() => {
    fetchData();

  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Modal transparent={true}
        statusBarTranslucent={true}
        animationType={'none'}
        visible={success_msg}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalView}>
            <Image source={require('../assets/images/success.png')} style={{ width: 60, height: 60, marginBottom: 10 }}>

            </Image>
            <Text style={{ fontSize: 16, color: '#1C1C1C', marginBottom: 20, fontFamily: 'Poppins-Regular', }}>{verificationStatus}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#EEC217',
                width: 70,
                height: 30,
                alignItems: "center",
                justifyContent: "center", borderRadius: 5
              }}
              onPress={() => setSuccess_msg(!success_msg)}
            >
              <Text style={{ fontSize: 14, color: '#1C1C1C' }}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <Loader loading={loading} />
        <Text style={styles.inputLabel}>Full Name</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            name="name"
            onChangeText={name => setInputName(name)}
            value={name}
            placeholder="Enter Your Name"
            placeholderTextColor="#696969"
            editable={nameEditMode}
          />
          <TouchableOpacity onPress={() => setNameEditMode(!nameEditMode)}>
            <Icons style={styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputEmail}
            onChangeText={email => setInputEmail(email)}
            value={email}
            placeholder="Enter Your Email"
            placeholderTextColor="#696969"
            editable={emailVerified !== "Verified" && emailEditMode} // Allow editing when not verified and not in edit mode
          />
      <TouchableOpacity onPress={() => setEmailEditMode(!emailEditMode)}>
            <Icons style={isDisabled ? styles.disabled : styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <View style={styles.emailVerified}>
            <Text style={styles.emailVerifiedStatus}>Status: <Text style={{ color: 'darkorange' }}>{emailVerified}</Text></Text>
          </View>
          <TouchableOpacity onPress={sendVerificationEmail}
            disabled={isDisabled}
            style={isDisabled ? styles.disabled : styles.verifyBtn} >
            <Text style={styles.verifybtnText}>Verify Email</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Address 1</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          borderWidth: 1,
          borderColor: '#696969',
          borderRadius: 10,
          width: '100%',
          backgroundColor: '#fff',
        }}>
          <TextInput
            style={{
              flex: 1,
              padding: 8,
              marginLeft: 10,
              color: '#1C1C1C',
              fontFamily: 'Poppins-Medium',
              textTransform: 'capitalize',
              textAlignVertical: 'top'
            }}
            onChangeText={text => setInputAddress1(text)}
            value={address_1}
            placeholder="Enter Your Address 1"
            placeholderTextColor="#696969"
            numberOfLines={3}
            multiline={true}
            editable={address1EditMode}
          />
          <TouchableOpacity onPress={() => setAdress1EditMode(!address1EditMode)}>
            <Icons style={styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Address 2</Text>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderWidth: 1,
          borderColor: '#696969',
          borderRadius: 10,
          width: '100%',
          backgroundColor: '#fff',
        }}>
          <TextInput
            style={{
              flex: 1,
              padding: 8,
              marginLeft: 10,
              color: '#1C1C1C',
              fontFamily: 'Poppins-Medium',
              textTransform: 'capitalize',
              textAlignVertical: 'top'
            }}
            onChangeText={text => setInputAddress2(text)}
            value={address_2}
            placeholder="Enter Your Address 2"
            placeholderTextColor="#696969"
            numberOfLines={3}
            multiline={true}
            editable={address2EditMode}
          />
          <TouchableOpacity onPress={() => setAdress2EditMode(!address2EditMode)}>
            <Icons style={styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>City</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your City"
            placeholderTextColor="#696969"
            onChangeText={text => setInputCity(text)}
            value={city}
            editable={cityEditMode}
          />
          <TouchableOpacity onPress={() => setCityEditMode(!cityEditMode)}>
            <Icons style={styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Postal Code</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Postal Code"
            placeholderTextColor="#696969"
            onChangeText={number => setInputPostalCode(number)}
            value={postal_code}
            editable={postalcodeEditMode}
          />
          <TouchableOpacity onPress={() => setPostalCodeEditMode(!postalcodeEditMode)}>
            <Icons style={styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Mobile Number</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter Your Mobile Number"
            placeholderTextColor="#696969"
            onChangeText={number => setNumber(number)}
            value={number}
            editable={numberVerified !== "Verified" && numberEditMode}
          />
          <TouchableOpacity onPress={() => setNumberEditMode(!numberEditMode)}>
            <Icons style={isDisabled ? styles.disabled : styles.settingIcon} name="user-edit" size={16} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
          <View style={styles.emailVerified}>
            <Text style={styles.emailVerifiedStatus}>Status: <Text style={{ color: 'darkorange' }}>{numberVerified}</Text></Text>
          </View>
          <TouchableOpacity onPress={sendVerificationNumber}
            disabled={isDisabledNumVerified}
            style={isDisabledNumVerified ? styles.disabled : styles.verifyBtn} >
            <Text style={styles.verifybtnText}>Verify Number</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.inputLabel}>Country</Text>
        <SelectDropdown
          data={countriesWithFlags}
          defaultValueByIndex={defaultCountryIndex}
          onSelect={(selectedItem, index) => {
            switch (index) {
              case 0:
                setInputCountry('United States');
                break;
              case 1:
                setInputCountry('Canada');
                break;
              default:
                setInputCountry('United States');
                break;
            }
          }}
          buttonStyle={styles.dropdown3BtnStyle}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View style={styles.dropdown3BtnChildStyle}>
                {selectedItem ? (
                  <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
                ) : (
                  <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
                )}
                <Text style={styles.dropdown3BtnTxt}>
                  {selectedItem ? selectedItem.title : 'Select Country'}</Text>
                <FontAwesome name="chevron-down" color={'#444'} size={18} />
              </View>
            );
          }}
          dropdownStyle={styles.dropdown3DropdownStyle}
          rowStyle={styles.dropdown3RowStyle}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View style={styles.dropdown3RowChildStyle}>
                <Image source={item.image} style={styles.dropdownRowImage} />
                <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
              </View>
            );
          }}
        />
        <TouchableOpacity style={styles.Btn} onPress={updateData}>
          <Text style={styles.BtnText} >Update Records</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal transparent={true}
        statusBarTranslucent={true}
        animationType={'none'}
        visible={verificationOtp}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.optmodalBackground}>
          <View style={styles.otpmodalView}>
            <View>
              <Text style={styles.otpHeading}>OTP Verification</Text>
              <Text style={styles.otpdes}>Enter the OTP you recived to{'\n'}<Text style={{ color: '#EEC217' }}>{email}</Text></Text>
              <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: 'center' }}>
                {otpDigits.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => (digitInputs.current[index] = input)}
                    style={{
                      borderWidth: 1,
                      width: 40,
                      height: 40,
                      margin: 5,
                      borderColor: '#696969',
                      textAlign: 'center',
                      color: '#1C1C1C',
                      borderColor: inputErrors[index] ? 'red' : 'black',
                    }}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(index, text)}
                    keyboardType="numeric"
                    maxLength={1}
                    onSubmitEditing={() => digitInputs.current[index + 1]?.focus()}
                  />
                ))}
              </View>
              <TouchableOpacity onPress={sendVerificationEmail} style={{
              }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',


                  color: '#1C1C1C',
                }}>Resend OTP</Text>
              </TouchableOpacity>
              <Text style={styles.otpdes}>{verificationStatusError}</Text>
              {inputErrors.includes(true) && <Text style={{ color: 'red' }}>Please fill in all fields.</Text>}
            </View>
            <TouchableOpacity
              onPress={verifyOTP}
              style={styles.otpBtn}
            >
              <Text style={{ fontSize: 14, color: '#1C1C1C' }}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVerificationOtp(!verificationOtp)} style={{
            }}>
              <Text style={{
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                color: '#1C1C1C',
              }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        {useEffect(() => {
          setVerificationStatusError(false)

        }, [verificationOtp,])}
      </Modal>
      <Modal transparent={true}
        statusBarTranslucent={true}
        animationType={'none'}
        visible={verificationOtpMobile}
        onRequestClose={() => {
          console.log('close modal');
        }}>
        <View style={styles.optmodalBackground}>
          <View style={styles.otpmodalView}>
            <View>
              <Text style={styles.otpHeading}>OTP Verification</Text>
              <Text style={styles.otpdes}>Enter the OTP you recived to{'\n'}<Text style={{ color: '#EEC217' }}>{number}</Text></Text>
              <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: 'center' }}>
                {otpDigits.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(input) => (digitInputs.current[index] = input)}
                    style={{
                      borderWidth: 1,
                      width: 40,
                      height: 40,
                      margin: 5,
                      borderColor: '#696969',
                      textAlign: 'center',
                      color: '#1C1C1C',
                      borderColor: inputErrors[index] ? 'red' : 'black',
                    }}
                    value={digit}
                    onChangeText={(text) => handleOtpChange(index, text)}
                    keyboardType="numeric"
                    maxLength={1}
                    onSubmitEditing={() => digitInputs.current[index + 1]?.focus()}
                  />
                ))}
              </View>
              <TouchableOpacity onPress={sendVerificationNumber} style={{
              }}>
                <Text style={{
                  fontSize: 14,
                  fontFamily: 'Poppins-Regular',


                  color: '#1C1C1C',
                }}>Resend OTP</Text>
              </TouchableOpacity>
              <Text style={styles.otpdes}>{verificationStatusError}</Text>
              {inputErrors.includes(true) && <Text style={{ color: 'red' }}>Please fill in all fields.</Text>}
            </View>
            <TouchableOpacity
              onPress={verifyOTPMobile}
              style={styles.otpBtn}
            >
              <Text style={{ fontSize: 14, color: '#1C1C1C' }}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setVerificationOtpMobile(!verificationOtpMobile)} style={{
            }}>
              <Text style={{
                fontSize: 14,
                fontFamily: 'Poppins-Regular',
                color: '#1C1C1C',
              }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        {useEffect(() => {
          setVerificationStatusError(false)
        }, [verificationOtp])}
      </Modal>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  disabled: {
    display: 'none'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
    paddingTop: 25,
  },
  inputLabel: {
    padding: 10,
    fontFamily: 'Poppins-Regular',
    color: '#1C1C1C',
    fontSize: 14

  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#696969',
    borderRadius: 30,
    width: '100%',
    backgroundColor: '#fff',
  },
  TextInput: {
    flex: 1,
    padding: 8,
    marginLeft: 10,
    color: '#1C1C1C',
    fontFamily: 'Poppins-Medium',
    textTransform: 'capitalize'
  },
  settingIcon: {
    padding: 8,
    color: '#696969'
  },
  verifyBtn: {
    width: 150,
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEC217",
    borderColor: "#858585",
    borderWidth: 1,
  },
  verifybtnText: {
    color: '#393939',
    fontSize: 14,
    fontFamily: 'Poppins-Regular'
  },
  emailVerified: {
    marginLeft: 10,
  },
  emailVerifiedStatus: {
    color: '#1C1C1C',
    fontFamily: 'Poppins-Medium',
    fontSize: 14
  },
  Btn: {
    width: "100%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEC217",
    borderColor: "#858585",
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20
  },
  BtnText: {
    color: '#393939',
    fontSize: 16,
    fontFamily: 'Poppins-Regular'
  },
  inputEmail: {
    textTransform: 'lowercase',
    flex: 1,
    padding: 8,
    marginLeft: 20,
    color: '#1C1C1C',
    fontFamily: 'Poppins-Medium',
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
    width: 300,
    height: 170
  },
  optmodalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#0000007d',
  },
  otpmodalView: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 350
  },
  otpHeading: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1C1C1C',
    marginBottom: 20
  },
  otpdes: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#696969',
    marginBottom: 10
  },
  otpBtn: {
    width: "80%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEC217",
    borderColor: "#858585",
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 20
  },
  dropdown3BtnStyle: {
    width: "100%",
    borderRadius: 100,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#696969',
    backgroundColor: '#fff',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 30, height: 30, resizeMode: 'contain' },
  dropdown3BtnTxt: {
    color: '#000',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {},
  dropdown3RowStyle: {
    // backgroundColor: 'white',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 30, height: 20, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 12,
  },


});