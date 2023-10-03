import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, StatusBar, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function ReportIssue() {
    const apiUrl = "https://custom.mystagingserver.site/parcel_safe_app/public/api/send-inquiry";
    const [issueDescription, setIssueDescription] = useState('');
    const [selected, setSelected] = useState('');
    const [success_msg, setSuccess_msg] = useState(false);
    const [status, setStatus] = useState();
    const [descriptionError, setDescriptionError] = useState('');
    const [selectedError, setSelectedError] = useState('');
    const [data, setData] = useState([]);

    const ReportIssueList = async () => {
        try {
            // Retrieve the token from AsyncStorage
            const csrfToken = await AsyncStorage.getItem('token');
            console.log(csrfToken);
            if (csrfToken) {
                const headers = {
                    Authorization: `Bearer ${csrfToken}`,
                    'Content-Type': 'application/json',
                };
                const response = await axios.get('https://custom.mystagingserver.site/parcel_safe_app/public/api/issue-list',
                    { headers });
                // console.log(response.data);
                if (response.data.issuestype) {
                    // Extract the "name" field from each object in the "issuestype" array
                    const names = response.data.issuestype.map(item => item.name);
                    console.log(names);
                    setData(names); // Set the extracted names in your state
                } else {
                    console.log('Invalid Response Data Structure');
                }
            } else {
                console.log('Invalid Token');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    };
    // const data = [
    //     { key: '1', value: 'Issue' },
    //     { key: '2', value: 'Issue' },
    //     { key: '3', value: 'option' },
    //     { key: '4', value: 'option' },
    //     { key: '5', value: 'Issue' },
    //     { key: '6', value: 'option' },
    //     { key: '7', value: 'option' },
    // ]

    const ReportIssuePost = async () => {
        try {
            // Retrieve the token from AsyncStorage
            const csrfToken = await AsyncStorage.getItem('token');
            console.log(csrfToken);
            if (csrfToken) {
                const headers = {
                    Authorization: `Bearer ${csrfToken}`,
                    'Content-Type': 'application/json',
                };
                if (!selected) {
                    setSelectedError("Please select an issue");
                    return;
                }

                if (!issueDescription) {
                    setDescriptionError("Please provide a description");
                    return;
                }

                if (issueDescription.length > 500) {
                    setDescriptionError("Description must be 500 characters or fewer.");
                    return;
                }
                const response = await axios.post(apiUrl,
                    {
                        issue: selected,
                        message: issueDescription
                    },
                    { headers });
                console.log(response.data.message);
                setSuccess_msg(!success_msg);
                setStatus(response.data.message);
            } else {
                console.log('Invalid description length');
                setDescriptionError("Invalid description length");
            }
        }

        catch (error) {
            console.error('Error:', error);
        }
    };
 useEffect(() =>{
    ReportIssueList();

 },[]);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.container}>
                <View>
                    <SelectList
                        setSelected={(val) => {
                            setSelected(val);
                            setSelectedError('');
                        }}
                        data={data}
                        save="value"

                        arrowicon={<FontAwesomeIcons name="chevron-down" size={12} color={'#1C1C1C'} />
                        }
                        search={false}
                        placeholder='Selcte An Issue *'
                        placeholderTextColor='#1C1C1C'
                        boxStyles={{
                            borderWidth: 1,
                            borderColor: "#696969",
                            borderRadius: 50,
                            width: "100%",
                            height: 45,
                            color: '#1C1C1C',
                            fontFamily: 'Poppins-Regular',
                        }}
                        dropdownStyles={{
                            marginTop: 0
                        }}
                        dropdownTextStyles={{
                            color: '#1C1C1C',
                        }}
                    />
                    <Text style={{ fontSize: 12, marginBottom: 10, marginTop: 10, color: 'red',  fontFamily: 'Poppins-Regular', }}>{selectedError}</Text>
                    <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Enter Description *"
                        placeholderTextColor="grey"
                        onChangeText={(text) => {
                            setIssueDescription(text);
                            if (text.length > 500) {
                                setDescriptionError('Description must be 500 characters or fewer.');
                            } else {
                                setDescriptionError('');
                            }
                        }}
                        value={issueDescription}
                        numberOfLines={10}
                        multiline={true}
                    />
                    <Text style={{ fontSize: 12, marginTop: 10, color: 'red' ,  fontFamily: 'Poppins-Regular', }}>{descriptionError}</Text>
                    <Text style={{ fontSize: 14, marginBottom: 30, textAlign: 'right', color: "#1C1C1C" }}>Max 500 Characters</Text>
                    <TouchableOpacity style={styles.subBtn} onPress={ReportIssuePost}>
                        <Text style={styles.subBtnText} >Submit</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
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
                        <Text style={{ fontSize: 16, color: '#1C1C1C', marginBottom: 20, fontFamily: 'Poppins-Regular', }}>{status}</Text>
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
        paddingTop: 25
    },

    textArea: {
        height: 300,
        borderWidth: 1,
        borderColor: "#696969",
        borderRadius: 10,
        width: "100%",
        flex: 1,
        textAlignVertical: 'top',
        justifyContent: "flex-start",
        padding: 14,
        color: '#1C1C1C'
    },
    subBtn: {
        width: '100%',
        height: 50,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#EEC217',
        borderColor: "#858585",
        borderWidth: 1,
        marginTop: 20
    },

    subBtnText: {
        color: '#393939',
        fontSize: 14,
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
        width: 300,
        height: 170
    },

});