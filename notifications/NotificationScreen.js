import { TouchableOpacity, Text, ScrollView, StyleSheet, View, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function NotificationScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.camBtn} onPress={() => navigation.navigate('notification-details')}>
                    <View style={styles.notiText}>
                        <Text style={{ fontSize: 14, color: '#1C1C1C', fontFamily: 'Poppins-Medium' }}>Randall Johnsson </Text>
                        <Text style={{ fontSize: 12, color: '#1C1C1C', fontFamily: 'Poppins-Regular' }}>10:01 PM{"\n"}<Text>6/7/2023</Text> </Text>
                    </View>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.camBtn} onPress={() => navigation.navigate('notification-details')}>
                    <View style={styles.notiText}>
                        <Text style={{ fontSize: 14, color: '#1C1C1C', fontFamily: 'Poppins-Medium' }}>Randall Johnsson </Text>
                        <Text style={{ fontSize: 12, color: '#1C1C1C', fontFamily: 'Poppins-Regular' }}>10:01 PM{"\n"}<Text>6/7/2023</Text> </Text>
                    </View>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.camBtn} onPress={() => navigation.navigate('notification-details')}>
                    <View style={styles.notiText}>
                        <Text style={{ fontSize: 14, color: '#1C1C1C', fontFamily: 'Poppins-Medium' }}>Randall Johnsson </Text>
                        <Text style={{ fontSize: 12, color: '#1C1C1C', fontFamily: 'Poppins-Regular' }}>10:01 PM{"\n"}<Text>6/7/2023</Text> </Text>
                    </View>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.camBtn} onPress={() => navigation.navigate('notification-details')}>
                    <View style={styles.notiText}>
                        <Text style={{ fontSize: 14, color: '#1C1C1C', fontFamily: 'Poppins-Medium' }}>Randall Johnsson </Text>
                        <Text style={{ fontSize: 12, color: '#1C1C1C', fontFamily: 'Poppins-Regular' }}>10:01 PM{"\n"}<Text>6/7/2023</Text> </Text>
                    </View>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
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
        paddingTop: 20,
    },
    camBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#696969",
        borderRadius: 50,
        marginTop: 20,
        backgroundColor: '#EEC217'
    },
    camIcon: {
        padding: 10,
        backgroundColor: '#1C1C1C',
        borderWidth: 1,
        borderRadius: 50,
        margin: 3
    },
    notiText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

})