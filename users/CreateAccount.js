
import React from 'react'
import { ScrollView, StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SelectList } from 'react-native-dropdown-select-list'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
export default function CreateAccount() {
    const navigation = useNavigation();
    const [selected, setSelected] = React.useState("");

    const dataOption1 = [
        { key: '1', value: 'Limited' },
        { key: '2', value: 'Unlimited' },
        {key: 3 ,value:'One-Time'}
    ]
    const dataOption2 = [
        { key: '1', value: 'option' },
        { key: '2', value: 'option' },
        { key: '3', value: 'option' },
        { key: '4', value: 'option' },
        { key: '5', value: 'option' },
        { key: '6', value: 'option' },
        { key: '7', value: 'option' },
    ]
    const dataOption3 = [
        { key: '1', value: 'option' },
        { key: '2', value: 'option' },
        { key: '3', value: 'option' },
        { key: '4', value: 'option' },
        { key: '5', value: 'option' },
        { key: '6', value: 'option' },
        { key: '7', value: 'option' },
    ]
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
              <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.container}>
                <View>
                    <TextInput style={styles.inputView}
                        placeholder='Enter First Name'
                        placeholderTextColor="#696969"
                    />
                    <TextInput style={styles.inputView}
                        placeholder='Enter Last Name'
                        placeholderTextColor="#696969"
                    />
                    <TextInput style={styles.inputView}
                        placeholder='(800) 555‑0100 '
                        placeholderTextColor="#696969"
                    />
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={dataOption1}
                        save="value"
                        arrowicon={<Text style={{
                            backgroundColor: '#EEC217',
                            borderColor: "#3B7CB6", borderRadius: 50, padding: 5, borderWidth: 3, width: 20, height: 20
                        }}><FontAwesomeIcons name="chevron-down" size={10} color={'#3B7CB6'} /></Text>
                        }
                        search={false}
                        placeholder='Access Type'
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
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={dataOption2}
                        save="value"
                        arrowicon={<Text style={{
                            backgroundColor: '#EEC217',
                            borderColor: "#3B7CB6", borderRadius: 50, padding: 5, borderWidth: 3, width: 20, height: 20
                        }}><FontAwesomeIcons name="chevron-down" size={10} color={'#3B7CB6'} /></Text>
                        }
                        search={false}
                        placeholder='Rights To Be Granted'
                        placeholderTextColor='#1C1C1C'
                        boxStyles={{
                            borderWidth: 1,
                            borderColor: "#696969",
                            borderRadius: 50,
                            width: "100%",
                            height: 45,
                            color: '#1C1C1C',
                            fontFamily: 'Poppins-Regular',
                            marginTop:15
                        }}
                        dropdownStyles={{
                            marginTop: 0
                        }}
                        dropdownTextStyles={{
                            color: '#1C1C1C',
                        }}
                    />
                          <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={dataOption3}
                        save="value"
                        arrowicon={<Text style={{
                            backgroundColor: '#EEC217',
                            borderColor: "#3B7CB6", borderRadius: 50, padding: 5, borderWidth: 3, width: 20, height: 20
                        }}><FontAwesomeIcons name="chevron-down" size={10} color={'#3B7CB6'} /></Text>
                        }
                        search={false}
                        placeholder='Grant Access to Safe (s)'
                        placeholderTextColor='#1C1C1C'
                        boxStyles={{
                            borderWidth: 1,
                            borderColor: "#696969",
                            borderRadius: 50,
                            width: "100%",
                            height: 45,
                            color: '#1C1C1C',
                            fontFamily: 'Poppins-Regular',
                            marginTop:15
                        }}
                        dropdownStyles={{
                            marginTop: 0
                        }}
                        dropdownTextStyles={{
                            color: '#1C1C1C',
                        }}
                    />
                    <TouchableOpacity style={styles.subBtn} onPress={()=> navigation.navigate('RegisteredUser')}>
                        <Text style={styles.subBtnText} >Create</Text>
                    </TouchableOpacity>


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

});