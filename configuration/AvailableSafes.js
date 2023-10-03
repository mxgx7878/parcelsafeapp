import React, { useState, useRef ,useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Animated,
  Easing,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import OnboardingImg from '../assets/images/onboardimg1.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function AvailableSafes() {
  const [data, setData] = useState([]);
  const [activeSafes, setActiveSafes] = useState([]); // Store active state for each safe

  const toggleSafeActiveState = (index) => {
    // Create a copy of the activeSafes array
    const updatedActiveSafes = [...activeSafes];
    // Toggle the active state for the selected safe
    updatedActiveSafes[index] = !updatedActiveSafes[index];
    setActiveSafes(updatedActiveSafes);
  };
  const SafeList = async () => {
    try {
        // Retrieve the token from AsyncStorage
        const csrfToken = await AsyncStorage.getItem('token');
        console.log(csrfToken);
        if (csrfToken) {
            const headers = {
                Authorization: `Bearer ${csrfToken}`,
                'Content-Type': 'application/json',
            };
            const response = await axios.get('https://custom.mystagingserver.site/parcel_safe_app/public/api/safe-list-app',
                { headers });
            // console.log(response.data);
            setData(response.data.safes);
        } else {
            console.log('Invalid Token');
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
};
useEffect(() => {
  SafeList();
},[]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
      <SafeAreaView style={styles.container}>
        {data.map(( item , index)=>(
    <View key={index}
    style={{
      flexDirection: 'row',
      backgroundColor: '#4985BB',
      borderRadius: 20,
      height: 150,
      marginTop: 20
    }}>
      <View style={styles.parcelsafeimageBox}>
        <Image style={styles.parcelsafeImage} source={OnboardingImg} />
      </View>
      <View style={styles.parcelsafedetailBox}>
        <Text style={{ fontSize: 16, color: "#FFFFFF", fontFamily: 'Poppins-Medium' ,textTransform:'capitalize'}}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: "#272727", fontFamily: 'Poppins-Medium' ,textTransform:'uppercase'}}>{item.serial_number}</Text>
        <Text style={{ fontSize: 13, color: "#F62217", fontFamily: 'Poppins-Regular' }}>Subscription ends On 20 dec 2023</Text>
        <Text style={{ fontSize: 12, color: "#FFFFFF", fontFamily: 'Poppins-Regular' }}>User Associated</Text>
        <Text style={{ fontSize: 12, color: "#FFFFFF", fontFamily: 'Poppins-Regular' }}>Configured Date</Text>
        <TouchableOpacity style={{
            position: 'absolute',
            right: 10, top: 10
          }} activeOpacity={0.9} onPress={() => toggleSafeActiveState(index)} >
            <Animated.View style={[styles.mainStyes, {
              backgroundColor: activeSafes[index] ? "#EEC217" : "#f1f3f4e3"
            }]} >
              <Animated.Text
                style={[
                  styles.eahcStyles,
                  {
                    opacity: activeSafes[index] ? 1 : 0,
                  },
                ]}>
                {/* On */}
              </Animated.Text>
              <Animated.Text
                style={[
                  styles.eahcStylesOf,
                  {
                    opacity: activeSafes[index] ? 0 : 1,
                  },
                ]}>
                {/* Off */}
              </Animated.Text>
              <Animated.View style={[styles.basicStyle, {
                 backgroundColor: activeSafes[index] ? "#3B7CB6" : "#3B7CB6",
                transform: [{
                  translateX: activeSafes[index] ? 30 : 0
                 
                }]
              }]} />
            </Animated.View>
          </TouchableOpacity>
      </View>
    </View>
        ))}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#4985BB',
          borderColor: '#373C44',
          borderWidth: 1,
          borderRadius: 20,
          height: 90,
          marginTop: 20
        }}>
          <View style={styles.parcelsafeimageBox}>
            <Image style={{
              width: 50,
              height: 100,
              position: "absolute",
              top: -8
            }} source={OnboardingImg} />
          </View>
          <View style={styles.parcelsafedetailBox}>
            <Text style={{ fontSize: 16, color: "#fff", fontFamily: 'Century-Gothic' }}>Safe # 01</Text>
            <TouchableOpacity style={styles.parcelsafeBtn}>
              <Text style={{ fontSize: 12, color: "#000" }}>connect</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.parcelsafeClose}>
              <Text style={{ fontSize: 12, color: "#000" }}>
                <MaterialIcons name="close" size={15} color="#FFFFFF" />
              </Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 20
  },
  parcelsafe: {
    flexDirection: 'row',
    backgroundColor: '#4985BB',
    borderColor: 'none',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 20

  },
  parcelsafeimageBox: {
    alignItems: 'center',
    backgroundColor: '#ffff',
    width: '30%',
    borderColor: '#272727',
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
    width: 65,
    height: 160,
    position: "absolute",
    top: -5
  },
  parcelsafedetailBox: {
    width: '70%',
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#272727',
    borderWidth: 1,
    borderLeftWidth:0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 0,
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
    borderColor: "#FFFFFF",
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
    backgroundColor: '#FFFFFF',
    width: 35,
    height: 35,
  },
  basicStyle: {
    height: 18,
    width: 18,
    borderRadius: 20,
    backgroundColor: '#FFF',
    marginTop: 5,
    marginLeft: 5
  },
  eahcStyles: {
    fontSize: 14,
    color: '#f5dd4b',
    position: 'absolute',
    top: 6,
    left: 5,
  },
  eahcStylesOf: {
    fontSize: 14,
    color: '#f4f3f4',
    position: 'absolute',
    top: 6,
    right: 5,
  },
  mainStyes: {
    borderRadius: 30,
    backgroundColor: '#EEC217',
    height: 28,
    width: 60,
  },
});