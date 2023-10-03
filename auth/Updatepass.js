
import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Pressable
} from 'react-native'
import axios from 'axios';
import { Formik } from 'formik'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Updatepass = () => {
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const managePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };
    const manageConfirmPasswordVisibility =() =>{
        setHideConfirmPassword(!hideConfirmPassword);
    }
    const signUpValidationSchema = yup.object().shape({
        password: yup
            .string()
            // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
            // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
            // .matches(/\d/, "Password must have a number")
            // .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
            // .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
    })
  
    const ResetPassword = async (data) => {
        try {
            const userId = await AsyncStorage.getItem("user"); 
            const headers = {
                'Content-Type': 'application/json',
            };
            const requestData = {
                userid: userId,
                password: data.password
            };
            const response = await axios.post(
                'https://custom.mystagingserver.site/parcel_safe_app/public/api/forgot-password-reset',
                requestData,
                { headers }
            );
    
            if (response.data.status === 1) {
                console.log(response.data.msg);
                navigation.navigate('login');
            } else {
                console.log(response.data.msg);
            }
        } catch (error) {
            console.error('Error resetting password:', error);
        }
    };
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.Container}>
                <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30, textAlign: 'center', color: "#1C1C1C", fontFamily: 'Poppins-Regular' }}>New Password</Text>
                <Formik
                    validationSchema={signUpValidationSchema}
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                    }}
                    onSubmit={values => {
                        data = { password: values.password };
                        ResetPassword(data);
                    }}
                >
                    {({ handleChange,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                         }) => (
                        <>
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#696969',
                                borderRadius: 30,
                                width: '100%',
                                height: 45,
                                marginBottom: 20,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center'
                                
                            }}>
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
                                    value={values.password}
                                />
                                <Pressable
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
                                </Pressable>
                            </View>
                            {errors.password && touched.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}
                            <View style={{
                                borderWidth: 1,
                                borderColor: '#696969',
                                borderRadius: 30,
                                width: '100%',
                                height: 45,
                                marginBottom: 20,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center'
                                
                            }}>
                                <TextInput
                                    style={styles.TextInput}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#858585"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={hideConfirmPassword}
                                    autoCompleteType="password"
                                    enablesReturnKeyAutomatically
                                    onChangeText={handleChange('confirmPassword')}
                                    value={values.confirmPassword}
                                />
                                <Pressable
                                    activeOpacity={0.8}
                                    style={styles.visibilityBtn}
                                    onPress={manageConfirmPasswordVisibility}>
                                    <Image
                                        source={
                                            hideConfirmPassword
                                                ? require('../assets/images/hide.png')
                                                : require('../assets/images/show.png')
                                        }
                                        style={styles.btnImage}
                                    />
                                </Pressable>
                            </View>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}

                            <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                                <Text style={styles.loginText}
                                >Submit</Text>
                            </TouchableOpacity>
                            
                        </>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        paddingTop: 20
    },
    loginBtn: {
        width: "100%",
        borderRadius: 100,
        padding: 8,
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
    btnImage: {
        width: 25,
        height: 25,
    },
    visibilityBtn: {
        paddingRight: 10
    },

    TextInput: {
        marginLeft: 20,
        color: '#1C1C1C',
    },
});
export default Updatepass