import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import RegisteredUser from '../users/RegisteredUser';
import Setting from '../screens/Setting';
import Camera from '../screens/Camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import { assets } from '../react-native.config';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    return (

        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarHideOnKeyboard: true,
            tabBarStyle: {
                backgroundColor: '#EEC217',
                borderRadius: 20,
                height: 60,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            },
            tabBarShowLabel: false,
            headerShown: false,
        })} >

            <Tab.Screen name="Home" component={Home} options={{
                title: false,
                headerShown: true,
                tabBarIcon: ({ size }) => (
                    <Image style={{ width: 25, height: 25, resizeMode: 'contain' }} source={require('../assets/images/safe.png')} />
                    // <MaterialIcons name="home" size={size} style={{ color: '#1C1C1C' }} />
                ),
            }} />
            <Tab.Screen name="RegisteredUser" component={RegisteredUser} options={{
                title: 'Sub-Account and One-Time-User',
                headerShown: true,
                tabBarLabel: 'Home',
                tabBarIcon: ({ size }) => (
                    <MaterialIcons name="person-add" size={30} style={{ color: '#1C1C1C' }} />
                ),
            }} />



            <Tab.Screen name="Settings" component={Setting} options={{
                headerShown: true,
                tabBarIcon: ({ size }) => (
                    <MaterialIcons name="settings" size={30} style={{ color: '#1C1C1C' }} />
                ),
            }} />
            <Tab.Screen name="camera" component={Camera} options={{
                headerShown: true,
                title: 'Camera',
                tabBarIcon: ({ size }) => (
                    <MaterialIcons name="insert-photo" size={30} style={{ color: '#1C1C1C' }} />
                ),
            }} />
        </Tab.Navigator>
    )
}