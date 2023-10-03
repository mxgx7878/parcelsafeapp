import React, { useState, useEffect, useRef } from 'react'
import { Modal, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from "react-native";
import axios from 'axios';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ForgotPassword() {

    const [email, setInputEmail] = useState();
    const [errortext, setError] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const navigation = useNavigation();
    const [undefinedError ,setUndefinedError ] = useState();

    const inputStyle = {
        borderWidth: 1,
        borderColor: '#696969',
        padding: 8,
        paddingLeft: 20,
        borderRadius: 100,
        marginBottom: 20,
        color: '#1C1C1C'
    };
    const sendVerificationEmail = async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.post(
                'https://custom.mystagingserver.site/parcel_safe_app/public/api/forgot-password',
                { forgot_user: email },
                { headers }
            );

            if (response.data.status == 1) {

                console.log(response.data.msg);
                navigation.navigate('verification');
                const userid = response.data.userid.toString(); // Convert to string
                await AsyncStorage.setItem('user', userid);
                console.log(userid);
            }
            else {
                console.log(response.data.msg);
                setShowAlert(!showAlert);
                setError(response.data.msg);
            }
            if(response.data.error == null){
                setUndefinedError(response.data.error);  
                  console.log(response.data.error);
            }
            else{
                setUndefinedError("Unverified Number",response.data.error);   
            }

           
        } catch (error) {
            console.error('Error sending verification email:', error);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30, textAlign: 'center', color: "#1C1C1C", fontFamily: 'Poppins-Regular' }}>Forgot Password</Text>
                <TextInput
                    style={inputStyle}
                    name="email"
                    placeholder="Enter Email "
                    placeholderTextColor="#696969"
                    onChangeText={email => setInputEmail(email)}
                    value={email}
                    keyboardType="email-address"
                />
                <TouchableOpacity style={styles.loginBtn} onPress={sendVerificationEmail}>
                    <Text style={styles.loginText}
                    >Submit</Text>
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
                        <Text style={{ color: '#393939', fontSize: 16, textAlign: 'center', marginTop: 15 }}>{errortext} {undefinedError}</Text>
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
        </SafeAreaView>
    );
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
        borderRadius: 100,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#EEC217",
        borderColor: "#858585",
        borderWidth: 1,
    },
    loginText: {
        color: '#393939',
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },

    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 20,
        fontFamily: 'Poppins-Regular'
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