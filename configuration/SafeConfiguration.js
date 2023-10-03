import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function SafeConfiguration() {
    const [selectedTab, setSelectedTab] = useState(0);
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
             <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
            <SafeAreaView style={Styles.container}>
                <TextInput style={Styles.inputView}
                    placeholder='Enter Number'
                    placeholderTextColor="#696969"
                    keyboardType="numeric"
                />
                <TextInput style={Styles.inputView}
                    placeholder='Enter Name'
                    placeholderTextColor="#696969"
                />
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'center',
                        marginTop: 20,
                        marginBottom: 20,
                        borderColor: "#858585",
                        borderWidth: 1,
                        borderRadius: 50,
                        height: 50,
                        width: '100%'
                        , backgroundColor: '#FFFFFF'
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor: selectedTab == 0 ? '#EEC217' : '#FFFFFF', width: '49%',
                            height: 40,
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }} onPress={() => {
                            setSelectedTab(0);

                        }}>
                            <Text style={Styles.configBtnText}>Wired Connection</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            backgroundColor: selectedTab == 0 ? '#FFFFFF' : '#EEC217', width: '49%',
                            height: 40,
                            borderRadius: 50,
                            alignItems: "center",
                            justifyContent: "center",
                        }} onPress={() => {
                            setSelectedTab(1);

                        }}>
                            <Text style={Styles.configBtnText}>Wifi Connection</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {selectedTab == 0 ? (
                    <View>
                        <TextInput style={Styles.inputView}
                            placeholder='DHCP'
                            placeholderTextColor="#696969"
                        />
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 15, color: "#1C1C1C", fontFamily: 'Poppins-Regular' }}>Static Addressing</Text>
                        <TextInput style={Styles.inputView}
                            placeholder='IP Address'
                            placeholderTextColor="#696969"
                        />
                        <TextInput style={Styles.inputView}
                            placeholder='Subnet Mask'
                            placeholderTextColor="#696969"
                        />
                        <TextInput style={Styles.inputView}
                            placeholder='Gateway'
                            placeholderTextColor="#696969"
                        />
                        <TextInput style={Styles.inputView}
                            placeholder='DNS Server 01'
                            placeholderTextColor="#696969"
                        />
                        <TextInput style={Styles.inputView}
                            placeholder='DNS Server 02'
                            placeholderTextColor="#696969"
                        />
                        <TouchableOpacity style={Styles.configBtn} onPress={() => navigation.navigate('available-safes')}>
                            <Text style={Styles.configBtnText} >Connect</Text>
                        </TouchableOpacity>
                    </View>
                ) :
                    (
                        <View>
                            <TextInput style={Styles.inputView}
                                placeholder='Network Name'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='Security Type'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='Security Key'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='DHCP'
                                placeholderTextColor="#696969"
                            />
                            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 15, color: "#1C1C1C", fontFamily: 'Poppins-Regular' }}>Static Addressing</Text>
                            <TextInput style={Styles.inputView}
                                placeholder='IP Address'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='Subnet Mask'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='Gateway'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='DNS Server 01'
                                placeholderTextColor="#696969"
                            />
                            <TextInput style={Styles.inputView}
                                placeholder='DNS Server 02'
                                placeholderTextColor="#696969"
                            />
                            <TouchableOpacity style={Styles.configBtn} onPress={() => navigation.navigate('available-safes')}>
                                <Text style={Styles.configBtnText} >Connect</Text>
                            </TouchableOpacity>
                        </View>
                    )}
            </SafeAreaView>

        </ScrollView>

    )
}
const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        paddingTop: 25,
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

    },

    configBtn: {
        width: '100%',
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#EEC217',
        borderColor: "#858585",
        borderWidth: 1,



    },
    configBtnD: {
        width: '40%',
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#EEC217',

    },
    configBtnText: {
        color: '#393939',
        fontSize: 14,
        fontFamily: 'Poppins-Regular'

    },
    configBtnL: {
        width: '40%',
        height: 40,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#FFFFFF',

    },
    configBtnTextL: {
        color: '#393939',
        fontSize: 14,
        fontFamily: 'Poppins-Regular'

    }
})