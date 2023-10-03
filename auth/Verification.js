import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Verification() {

    const navigation = useNavigation();
    const [otpDigits, setOtpDigits] = useState(['', '', '', '', '']);
    const [inputErrors, setInputErrors] = useState([false, false, false, false, false]);
    const [verificationStatusError, setVerificationStatusError] = useState();
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
    const verifyOTP = async () => {
        
        // Check for empty digits and set input errors
        const newInputErrors = otpDigits.map(digit => digit === '');
        setInputErrors(newInputErrors);

        // Proceed if no input errors and all OTP digits are filled
        if (!newInputErrors.includes(true) && otpDigits.every(digit => digit !== '')) {
            try {
                // Join OTP digits into a single code
                const otpCode = otpDigits.join('');
                const headers = {
                    'Content-Type': 'application/json',
                };
                const userId = await AsyncStorage.getItem("user"); 
                const response = await axios.post(
                    'https://custom.mystagingserver.site/parcel_safe_app/public/api/forgot-password-code',
                    { code: otpCode, userid: userId },
                    { headers }
                );
                console.log(userId);
                if (response.data.status ==1) {
                   
                    console.log(response.data.msg);
                    navigation.navigate('updatepass');
                }
                else {
                    console.log(response.data.msg);
                    setVerificationStatusError(response.data.msg);
                }
               
            } catch (error) {
                console.error('Error verifying OTP:', error);
            } finally {
                // Clear the OTP digits after verification attempt
                setOtpDigits(['', '', '', '', '']);
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: 'center', color: "#1C1C1C", fontFamily: 'Poppins-Regular' }}>Verification</Text>
                    <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', color: "#3A3A3A", fontFamily: 'Poppins-Regular' }}>Enter the code from the sms and email{'\n'}we sent you</Text>
                </View>
                {/* <View>
                    <Text style={{ fontSize: 16, marginBottom: 20, textAlign: 'center', color: "#3A3A3A" }}>00:30</Text>
                </View> */}
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, justifyContent: 'center' }}>
                    {otpDigits.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(input) => (digitInputs.current[index] = input)}
                            style={{
                                borderWidth: 1,
                                borderColor: '#272727',
                                width: 50,
                                height: 50,
                                margin: 5,
                                borderRadius: 10,
                                textAlign: 'center',
                                color: '#1C1C1C',
                                backgroundColor: '#EEC217',
                                borderColor: inputErrors[index] ? 'red' : 'black',
                            }}
                            placeholder='0'
                            placeholderTextColor="#272727"
                            value={digit}
                            onChangeText={(text) => handleOtpChange(index, text)}
                            keyboardType="numeric"
                            maxLength={1}
                            onSubmitEditing={() => digitInputs.current[index + 1]?.focus()}
                        />
                    ))}
                </View>
                <Text>{verificationStatusError}</Text>
                {inputErrors.includes(true) && <Text style={{ color: 'red' }}>Please fill in all fields.</Text>}
                <TouchableOpacity style={styles.loginBtn} onPress={verifyOTP}>
                    <Text style={styles.loginText} >Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    loginBtn: {
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#EEC217",
        borderColor: "#858585",
        borderWidth: 1,
    },
    loginText: {
        color: '#393939',
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    }

});