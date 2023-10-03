import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import SelectDropdown from "react-native-select-dropdown";
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TextInput,
    Button,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Alert, Image, Modal, Pressable
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import CustomInput from '../components/CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Loader from '../components/Loader';


const Signup = () => {
    const [mobileNumber, setMobileNumber] = useState('+1 ');
    const handleMobileNumberChange = (text) => {
        setMobileNumber(text);
    };
    const countries = ["United States", "Canada"];
    const countriesWithFlags = [
        { title: 'United States', image: require('../assets/images/us.png') },
        { title: 'Canada', image: require('../assets/images/ca.png') },
    ];
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const managePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };
    const manageConfirmPasswordVisibility = () => {
        setHideConfirmPassword(!hideConfirmPassword);
    }
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false)
    const [countriesType, setCountriesType] = useState("0");
    const [errortext, setErrortext] = useState('');
    const navigation = useNavigation();


    async function postJSON(data) {
        try {
            setLoading(true);
            const response = await fetch(
                "https://custom.mystagingserver.site/parcel_safe_app/public/api/auth/register",
                {
                    method: "POST", // or 'PUT'
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );
            const result = await response.json();
            setLoading(false);
            if (result.status == "Success") {
                const storeData = async (value) => {
                    try {
                        if (result.data.token != undefined) {
                            await AsyncStorage.setItem("token", result.data.token);
                        }
                    } catch (e) {
                        // saving error
                    }
                };
                ToastAndroid.show("Registered Successfully!", ToastAndroid.SHORT);
                navigation.navigate("login");
            }
            else {
                setShowAlert(!showAlert);
                setErrortext(result.errors.email);
                // ToastAndroid.show('' + result.errors.email, ToastAndroid.SHORT);
            }
            console.log("Success:", result);
            return result;
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
        }
    }
    const [isSelected, setSelection] = useState(false);
    const signUpValidationSchema = yup.object().shape({
        name: yup
            .string()
            // .matches(/(\w.+\s).+/, 'Enter at least 2 names')
            .required('Full name is required'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email is required'),
        address_1: yup
            .string()
            .required('Address is required'),
        postal_code: yup
            .string()
            // .matches(/(01)(\d){8}\b/, 'Enter a valid Postal Code')
            .required('Postal Code is required'),
        city: yup
            .string()
            .required('City is required'),
        number: yup
            .string()
            .matches(/^(?:\+1|\+92)\d+$/

            , 'Number is required')
            .required('Number is required'),
        password: yup
            .string()
            .min(8, ({ min }) => `password must contain ${min} or more characters with at least one of each: uppercase, lowercase, number and special character`)
            .matches(/\w*[a-z]\w*/, "Password must have a small letter")
            .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
            .matches(/\d/, "Password must have a number")
            .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
            .required('Password is required'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords do not match')
            .required('Confirm password is required'),
    })
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>

                <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <Loader loading={loading} />
                <View style={styles.Container}>
                    {/* <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 30, textAlign: 'center', color: "#1C1C1C", fontFamily: 'Poppins-Regular' }}>Register</Text> */}
                    <Formik
                        validationSchema={signUpValidationSchema}
                        initialValues={{
                            name: "",
                            email: "",
                            phoneNumber: "",
                            password: "",
                            confirmPassword: "",
                            address_1: "",
                            address_2: "",
                            postal_code: "",
                            city: "",
                            country: "",
                            number: "+1",
                        }}
                        onSubmit={(values) => {
                            if (values.country === '') {
                                ToastAndroid.show(
                                    "Please select your country!",
                                    ToastAndroid.SHORT
                                );

                            }
                            else {
                                if (isSelected) {
                                    data = {
                                        name: values.name,
                                        email: values.email,
                                        password: values.password,
                                        password_confirmation: values.confirmPassword,
                                        address_1: values.address_1,
                                        address_2: values.address_2,
                                        postal_code: values.postal_code,
                                        city: values.city,
                                        country: values.country,
                                        number: values.number
                                    };

                                    postJSON(data);
                                }
                                else {
                                    ToastAndroid.show(
                                        "Please agree to terms & policies!",
                                        ToastAndroid.SHORT
                                    );
                                }
                            }

                        }}
                    >
                        {({ handleChange, handleSubmit, values,
                            errors, touched, }) => (
                            <>
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('name')}
                                        value={values.name}
                                        placeholder="Full Name *"
                                        placeholderTextColor="#696969"
                                    />
                                </View>
                                {errors.name && touched.name && (
                                    <Text style={styles.errorText}>{errors.name}</Text>
                                )}
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('email')}
                                        value={values.email}
                                        placeholder="Email Address *"
                                        placeholderTextColor="#696969"
                                        keyboardType="email-address"
                                    />
                                </View>
                                {errors.email && touched.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('address_1')}
                                        value={values.address_1}
                                        placeholder="Enter Address 1 *"
                                        placeholderTextColor="#696969"
                                    />
                                </View>
                                {errors.address_1 && touched.address_1 && (
                                    <Text style={styles.errorText}>{errors.address_1}</Text>
                                )}
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('address_2')}
                                        value={values.address_2}
                                        placeholder="Enter Address 2 (Optional)"
                                        placeholderTextColor="#696969"
                                    />
                                </View>
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('city')}
                                        value={values.city}
                                        placeholder="Enter City *"
                                        placeholderTextColor="#696969"
                                    />
                                </View>
                                {errors.city && touched.city && (
                                    <Text style={styles.errorText}>{errors.city}</Text>
                                )}
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('postal_code')}
                                        value={values.postal_code}
                                        placeholder="Enter Postal Code *"
                                        placeholderTextColor="#696969"
                                        keyboardType="numeric"
                                    />
                                </View>
                                {errors.postal_code && touched.postal_code && (
                                    <Text style={styles.errorText}>{errors.postal_code}</Text>
                                )}
                                <View style={styles.inputView}>
                                    <TextInput
                                        style={styles.TextInput}
                                        onChangeText={handleChange('number')}
                                        value={values.number}
                                        placeholder="Enter Mobile Number *"
                                        placeholderTextColor="#696969"
                                        keyboardType="numeric"
                                    />
                                </View>
                                {errors.number && touched.number && (
                                    <Text style={styles.errorText}>{errors.number}</Text>
                                )}

                                <SelectDropdown
                                    statusBarTranslucent={true}
                                    data={countriesWithFlags}
                                    onSelect={(selectedItem, index) => {
                                        switch (index) {
                                            case 0:
                                                values.country = 'United States';
                                                break;
                                            case 1:
                                                values.country = 'Canada';
                                                break;
                                            default:
                                                values.country = 'United States';
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
                                <View style={{
                                    borderWidth: 1,
                                    borderColor: '#696969',
                                    borderRadius: 30,
                                    width: '100%',
                                    height: 45,
                                    marginBottom: 20,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'

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
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'

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
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={isSelected}
                                        onValueChange={setSelection}
                                        tintColors={{ true: '#EEC217', false: 'black' }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>I agree with terms & policies</Text>
                                </View>
                                <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                                    <Text style={styles.loginText}> Sign Up</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text style={styles.login_button} onPress={() => navigation.navigate('login')} >Sign In</Text>
                                </TouchableOpacity>
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
                </View>
            </SafeAreaView>
        </ScrollView>
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
        padding: 10,
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
        marginBottom: 20
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',

    },
    label: {
        margin: 8,
        color: '#1C1C1C'
    },
    login_button: {
        height: 30,
        marginTop: 20,
        textAlign: 'center',
        color: '#393939',
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    dropdown3BtnStyle: {
        width: "100%",
        borderRadius: 100,
        borderColor: "#696969",
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        borderWidth: 1,
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
        fontSize: 16,
        marginHorizontal: 12,
    },
    dropdown3DropdownStyle: {
        marginTop: 25
    },
    dropdown3RowStyle: {
        borderBottomColor: '#444',
        height: 45,
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
    errorSignup: {
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
    inputView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#696969',
        borderRadius: 30,
        width: '100%',
        marginBottom: 15
    },
    TextInput: {
        flex: 1,
        padding: 8,
        marginLeft: 10,
        color: '#1C1C1C',
        fontFamily: 'Poppins-Medium',
    },
    btnImage: {
        width: 25,
        height: 25,
    },
    visibilityBtn: {
        paddingRight: 10
    }

});
export default Signup