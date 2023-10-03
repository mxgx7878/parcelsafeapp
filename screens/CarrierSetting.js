import React from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, StatusBar } from 'react-native'
import { Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function CarrierSetting() {
    return (
        
            <SafeAreaView style={styles.container}>
                    <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
                   <TextInput style={styles.inputView}
                        placeholder='Carrier Name'
                        placeholderTextColor="#696969"
                    />
                <Text style={{ fontSize: 20, color: '#1C1C1C', fontFamily: 'Poppins-Medium' ,textAlign:'center',marginBottom:20 }}>Access Code</Text>
                <View style={styles.otpContainer}>
                    <TextInput style={styles.OtpInput}
                        name='opt'
                        placeholder='0'
                        placeholderTextColor="#272727"
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput style={styles.OtpInput}
                        placeholder='0'
                        placeholderTextColor="#272727"
                        keyboardType='numeric'
                        maxLength={1}
                    />
                    <TextInput style={styles.OtpInput}
                        placeholder='0'
                        placeholderTextColor="#272727"
                        keyboardType='numeric'
                        maxLength={1}

                    />
                    <TextInput style={styles.OtpInput}
                        placeholder='0'
                        placeholderTextColor="#272727"
                        keyboardType='numeric'
                        maxLength={1}
                    />
                </View>
                <TouchableOpacity style={styles.Btn}>
                    <Text style={styles.BtnText} >Submit</Text>
                </TouchableOpacity>
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    otpContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-evenly',
        marginBottom: 20,
        alignItems: 'center'

    },
    OtpInput: {
        borderWidth: 1,
        borderColor: '#272727',
        padding: 10,
        paddingLeft: 20,
        marginBottom: 5,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#EEC217',
        fontSize: 16
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
    },
    BtnText: {
        color: '#393939',
        fontSize: 16,
        fontFamily: 'Poppins-Regular'

    },
    inputView: {
        borderWidth: 1,
        borderColor: "#696969",
        borderRadius: 50,
        width: "100%",
        height: 45,
        marginBottom: 15,
        padding: 10,
        paddingLeft: 20,
        color: '#1C1C1C',
        fontFamily: 'Poppins-Regular',
    }
})
