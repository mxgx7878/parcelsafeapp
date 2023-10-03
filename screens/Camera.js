import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, StatusBar } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CameraImage from '../assets/images/camera.png';
import { useNavigation } from '@react-navigation/native';


export default function Camera() {
  const navigation = useNavigation();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: 'center', color: "#1C1C1C" }}>Camera</Text>
        <View style={{ flex: 1, borderWidth: 1, borderColor: '#4381B9', borderRadius: 20, width: '100%', height: 400, justifyContent: 'center' }}>
          <Image style={{ width: '100%' }} source={CameraImage} />
        </View>

        <TouchableOpacity style={styles.camBtn} onPress={() => navigation.navigate('videoArchives')}>
          <MaterialIcons
            style={[styles.camIcon, { marginLeft: 3 }]} // Combine styles using an array
            name="fullscreen"
            size={20}
            color="#FFFFFF"
          />
          <Text style={styles.camText}>Saved Video Archive
          </Text>
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
    paddingTop: 25,
  },
  camBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#696969",
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: '#EEC217',
    height: 45
  },
  camIcon: {
    padding: 7,
    backgroundColor: '#1C1C1C',
    borderWidth: 1,
    borderRadius: 50,
    marginRight: 3

  },
  camText: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color: '#1C1C1C',
  },

});