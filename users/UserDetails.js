import React from 'react'
import { View, Text, ScrollView, StyleSheet, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function UserDetails({ route }) {
    const { username,useremail,userphone,usersafe,usertype,userduration } = route.params;
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.container}>
                <View style={styles.UserDetails}>
                    <Text style={styles.baseText}>Name: <Text style={styles.innerText}>{username}</Text></Text>
                    <Text style={styles.baseText}>Email: <Text style={styles.innerEmail}>{useremail}</Text></Text>
                    <Text style={styles.baseText}>Mobile No: <Text style={styles.innerText}>{userphone}</Text></Text>
                    <Text style={styles.baseText}>Selcted Safe: <Text style={styles.innerText}>{usersafe}</Text></Text>
                    <Text style={styles.baseText}>Access Type: <Text style={styles.innerText}>{usertype}</Text></Text>
                    <Text style={styles.baseText}>Access Duration: <Text style={styles.innerText}>{userduration}</Text></Text>
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
    UserDetails: {
        backgroundColor: '#EEC217',
        borderColor: "#858585",
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
    },
    baseText: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 10,
        color: '#1C1C1C',
        fontFamily: 'Poppins-Regular',
        textTransform: 'capitalize'
    },
    innerText: {
        fontWeight: '500',
        textTransform: 'capitalize'
    },
    innerEmail: {
        fontWeight: '500',
        textTransform: 'lowercase'
    }

})