
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, LayoutAnimation, Pressable, StatusBar, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const dummyData = [
    {
        id: 1,
        name: "John Deo",
        email: "Johndoe@gmail.com",
        phone: " 000 000 000",
        safe: " Safe 01",
        duration: "Always",
        type: 'Limited',
        img: require('../assets/images/onboardimg1.png'),
    },
    {
        id: 2,
        name: "Gwenette Boddie",
        email: "gwenette@gmail.com",
        phone: " 000 000 000",
        safe: " Safe 02",
        duration: "Always",
        type: 'Limited',
        img: require('../assets/images/onboardimg1.png'),
    },
    {
        id: 3,
        name: "Kevin Harmony",
        email: "kevin@gmail.com",
        phone: " 000 000 000",
        safe: " Safe 03",
        duration: "Always",
        type: 'Limited',
        img: require('../assets/images/onboardimg1.png'),
    }
];
const RegisteredUser = () => {
    const [openModal, setOpenModel] = useState(false)
    const layoutAnimConfig = {
        duration: 300,
        update: {
            type: LayoutAnimation.Types.easeInEaseOut,
        },
        delete: {
            duration: 100,
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
        },
    };
    const navigation = useNavigation();
    const [data, setData] = useState(dummyData);
    const removeItem = (id) => {
        let arr = data.filter(function (item) {
            return item.id !== id
        })
        setData(arr);
        LayoutAnimation.configureNext(layoutAnimConfig)
    };
    const addUser = () => {
        navigation.navigate('CreateAccount')
        setOpenModel(!openModal)
    }
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} >
                    <TouchableOpacity style={styles.plusIcon} onPress={() => setOpenModel(!openModal)} >
                        <MaterialCommunityIcons name="plus" size={20} color="#EEC217" />
                    </TouchableOpacity>
                    <Text style={styles.plusText}>Add User</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: 'center', color: "#1C1C1C", fontFamily: 'Poppins-Regular', }}>Registered Users</Text>

                {data.map((item, index) => (
                    <Pressable style={styles.parcelsafe} key={index} onPress={() => navigation.navigate('UserDetails', {
                        username: item.name,
                        useremail: item.email,
                        userphone: item.phone,
                        usersafe: item.safe,
                        usertype: item.type,
                        userduration: item.duration
                    })}>
                        <View style={styles.parcelsafeimageBox}>
                            <Image style={styles.parcelsafeImage} source={item.img} />
                        </View>
                        <View style={styles.parcelsafedetailBox}>
                            <Text style={styles.baseText}>User : <Text style={styles.innerText}>{item.id}</Text></Text>
                            <Text style={styles.baseText}>{item.name}</Text>
                            <Text style={styles.baseText}>Access Type : <Text style={styles.innerText}>{item.type}</Text></Text>

                            <TouchableOpacity style={styles.parcelsafeBtn}>
                                <Text style={{ fontSize: 12, color: "#000" }} onPress={() => removeItem(item.id)}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                ))}
            </SafeAreaView>
            <Modal transparent={true}
                statusBarTranslucent={true}
                animationType={'none'}
                visible={openModal}
                onRequestClose={() => {
                    console.log('close modal');
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalView}>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setOpenModel(!openModal)}>
                            <Icons name="close" size={20} color="#fff" />
                        </Pressable>
                        <View style={{flexDirection:'row'}}>
                        <Text> <Icons name="person-add" size={30} color="#4985BB" /></Text>
                        <Text style={{fontSize:16 ,color:'#1C1C1C' ,padding:5}}>Create Account</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                backgroundColor: '#EEC217',
                                width: '100%',
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center", borderRadius: 10 ,marginTop:10
                            }}
                            onPress={addUser}>
                            <Text style={{ fontSize: 14, color: '#1C1C1C' }}>Sub-Account-User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                
                                backgroundColor: '#4985BB',
                                width: '100%',
                                height: 40,
                                alignItems: "center",
                                justifyContent: "center", borderRadius: 10 ,marginTop:10
                            }}
                            onPress={addUser}>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>One-Time-User</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
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
        width: 300,
        height: 180,
        padding: 20
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
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        paddingTop: 25
    },
    parcelsafe: {
        flexDirection: 'row',
        backgroundColor: '#4985BB',
        borderColor: '#373C44',
        borderWidth: 1,
        borderRadius: 20,
        height: 90,
        marginTop: 20

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
        position: 'absolute',
        right: 10,
        top: 10
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
    plusIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 50,
        borderColor: "#1C1C1C",
        width: 30,
        height: 30,
    },
    plusText: {
        color: "#1C1C1C",
        padding: 5,
        fontSize: 14

    },
    baseText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        fontFamily: 'Poppins-Regular',
        textTransform: 'capitalize',

    },
    innerText: {
        fontWeight: '500',
        textTransform: 'capitalize'
    },

});
export default RegisteredUser;