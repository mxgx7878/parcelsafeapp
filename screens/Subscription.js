import React, { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, StatusBar} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivePlan from '../components/ActivePlan'
import AvailablePlan from '../components/AvailablePlan'

export default function Subscription() {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
               <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.container}>
                <Text style={{ fontSize: 20, color: '#1C1C1C', fontFamily: 'Poppins-Medium' }}>Active Plans</Text>
                <ActivePlan/>
                <Text style={{ fontSize: 20, color: '#1C1C1C', fontFamily: 'Poppins-Medium', marginTop: 20 }}>Available Plans</Text>
                <AvailablePlan/>
            </SafeAreaView>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 20,
        paddingTop: 20,
    }
   
})