import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Modal, Alert, Pressable, StatusBar, } from 'react-native'
import React, { useState, useLayoutEffect, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import OnboardingImg from '../assets/images/onboardimg1.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Home() {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: (props) => (
                <TouchableOpacity  {...props} style={styles.notiIcon} onPress={() => setModalVisible(true)} >
                    <MaterialIcons name="notifications" size={20} color="#4985BB" />
                </TouchableOpacity>
            ),
            headerRight: (props) => (
                <TouchableOpacity  {...props} style={styles.notiIcon}  >
                    <MaterialIcons name="location-on" size={20} color="#4985BB" />
                </TouchableOpacity>
            ),
            headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOpacity: 0
            },
        });
    }, [navigation]);

    const [modalVisible, setModalVisible] = useState(false);
    const onSaveClick = () => {
        navigation.navigate("notification-screen")
        setModalVisible(!modalVisible)
    }
    const navigation = useNavigation();
   
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" />
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center', color: "#1C1C1C" }}>Registered Safes</Text>
                
                <View style={styles.parcelsafe}>
                    <View style={styles.parcelsafeimageBox}>
                        <Image style={styles.parcelsafeImage} source={OnboardingImg} />
                    </View>
                    <View style={styles.parcelsafedetailBox}>
                        <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'Century-Gothic' }}>Safe # 01</Text>
                        <Text style={{ fontSize: 12, color: "#fff", fontFamily: 'Poppins-Regular' }}>3 months left in expiry</Text>
                        <TouchableOpacity style={styles.parcelsafeBtn}>
                            <Text style={{ fontSize: 12, color: "#000" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.parcelsafeClose}>
                            <Text style={{ fontSize: 12, color: "#000" }}>
                                <MaterialIcons name="close" size={15} color="#FFFFFF" />
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal animationType='slide'
                    statusBarTranslucent={true}
                    transparent={true} visible={modalVisible} onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);

                    }} >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalView}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <MaterialIcons name="close" size={20} color="#fff" />
                            </Pressable>
                            <View style={styles.notiHeader}>
                                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 10, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20, color: "#1C1C1C", fontFamily: 'Poppins-Medium' }}>Notifications</Text>
                                    <Text style={{ fontSize: 14, color: "#1C1C1C" }}>Mark all as read</Text>
                                </View>
                                <TouchableOpacity onPress={onSaveClick}>
                                    <Text style={{ fontSize: 16, fontWeight: '600', color: "#1C1C1C", borderBottomWidth: 2, borderBottomColor: '#1C1C1C', width: 70, paddingBottom: 5 }}>View All</Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView style={{ minHeight: 250, maxHeight: 250 }} showsVerticalScrollIndicator={false}>
                                <TouchableOpacity style={styles.notiViews} onPress={onSaveClick}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={styles.notiIcons}>
                                            <FontAwesomeIcons name="user-circle" size={20} color='#1C1C1C' />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.notiText}>Randall Johnsson</Text>
                                            <Text style={styles.timeText}>11: 04 :PM</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.notiViews} onPress={onSaveClick}>

                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={styles.notiIcons}>
                                            <FontAwesomeIcons name="user-circle" size={20} color='#1C1C1C' />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.notiText}>Randall Johnsson</Text>
                                            <Text style={styles.timeText}>11: 04 :PM</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.notiViews} onPress={onSaveClick}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={styles.notiIcons}>
                                            <FontAwesomeIcons name="user-circle" size={20} color='#1C1C1C' />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.notiText}>Randall Johnsson</Text>
                                            <Text style={styles.timeText}>11: 04 :PM</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.notiViews} onPress={onSaveClick}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={styles.notiIcons}>
                                            <FontAwesomeIcons name="user-circle" size={20} color='#1C1C1C' />
                                        </View>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={styles.notiText}>Randall Johnsson</Text>
                                            <Text style={styles.timeText}>11: 04 :PM</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
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
    parcelsafe: {
        flexDirection: 'row',
        backgroundColor: '#4985BB',
        borderColor: '#373C44',
        borderWidth: 1,
        borderRadius: 20,
        height: 90,
        marginTop: 30

    },
    parcelsafeimageBox: {
        alignItems: 'center',
        backgroundColor: '#ffff',
        width: '30%',
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 20,
        position: 'relative'
    },
    parcelsafeImage: {
        width: 40,
        height: 100,
        position: "absolute",
        top: -8
    },
    parcelsafedetailBox: {
        width: '70%',
        paddingLeft: 20,
        paddingRight: 20,
        borderWidth: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 0,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 0,
        position: 'relative',
        padding: 8
    },
    parcelsafeBtn: {
        width: "40%",
        borderRadius: 25,
        height: 25,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 5,
        backgroundColor: "#EEC217",
        borderColor: "#858585",
        borderWidth: 1,
    },
    parcelsafeClose: {
        width: 25,
        height: 25,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#fff",
        borderWidth: 2,
        position: 'absolute',
        right: 10,
        top: 10
    },
    notiIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,

        borderColor: "#1C1C1C",
        backgroundColor: '#fff',
        width: 35,
        height: 35,
        marginLeft: 15,
        marginRight: 15
    },
    notiIcons: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#1C1C1C",
        backgroundColor: "#EEC217",
        width: 40,
        height: 40,
    },

    notiText: {
        color: "#1C1C1C",
        fontWeight: "bold",
        fontSize: 14
    }
    ,
    timeText: {
        color: "#646464",
        fontSize: 14
    }
    , notiViews: {
        paddingTop: 10,
        paddingBottom: 10
    },
    modalView: {
        position: 'relative',
        margin: 15,
        marginTop: 80,
        paddingTop: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 1,
        borderColor: "#1C1C1C",
        height: 400
    },
    buttonClose: {
        width: 25,
        height: 25,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#4985BB',
        position: 'absolute',
        right: -5,
        top: -5,
    },
    notiHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#1C1C1C',
        marginBottom: 10

    },

    modalBackground: {
        flex: 1,
        backgroundColor: '#00000040',


    },
});