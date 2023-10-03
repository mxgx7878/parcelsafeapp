import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Setting() {
  const [showAlert, setShowAlert] = useState(false)
  const navigation = useNavigation();
  async function logoutMyToken() {
    try {
      await AsyncStorage.removeItem('token');
      navigation.replace('Auth');
    } catch (e) {
      await AsyncStorage.removeItem('token');

      navigation.replace('Auth');
    }

  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('accoun-setting')}>
          <MaterialIcons style={styles.settingbtnIcon} name="account-circle" size={20} color="#000" />
          <Text style={styles.settingbtnText}> Account Settings</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('configuration')}>
          <MaterialIcons style={styles.settingbtnIcon} name="settings-cell" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Safe Configuration</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('RegisteredUser')}>
          <MaterialIcons style={styles.settingbtnIcon} name="people" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Sub-Account and One-Time User</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('carrier-setting')}>
          <MaterialIcons style={styles.settingbtnIcon} name="settings-applications" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Carrier Setting</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('subscription')}>
          <MaterialIcons style={styles.settingbtnIcon} name="shop" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Subscription</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('camera')}>
          <MaterialIcons style={styles.settingbtnIcon} name="camera-alt" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Camera</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => navigation.navigate('reportIssue')}>
          <MaterialIcons style={styles.settingbtnIcon} name="error-outline" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Report An Issue</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingBtn} onPress={() => setShowAlert(!showAlert)} >
          <FontAwesomeIcons style={styles.settingbtnIcon} name="sign-out" size={20} color="#000" />
          <Text style={styles.settingbtnText}>Sign Out</Text>
          <MaterialIcons style={styles.settingbtnIcon} name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>
        <Modal
          transparent={true}
          statusBarTranslucent={true}
          animationType={'none'}
          visible={showAlert}
          onRequestClose={() => {
            console.log('close modal');
          }}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalView}>
              <Text style={{color: '#393939', fontSize:20 ,textAlign:'center',fontFamily:'Poppins-Medium'}}>Sign Out</Text>
              <Text style={{color: '#393939', fontSize:16 ,textAlign:'center' }}>Are you sure want to Sign Out</Text>
              <View style={{ flexDirection: 'row', flex:1, justifyContent: 'space-around' ,width:'90%', marginTop:-25 }}>
                <Pressable style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 40,
                  backgroundColor: '#828282',
                  borderRadius: 10,
                  width: 80,
                  height: 40
                }} onPress={() => { setShowAlert(!showAlert); }}>
                  <Text style={{ color: '#fff',fontSize:13 }}>Cancel</Text>
                </Pressable>
                <Pressable style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 40,
                  backgroundColor: '#EEC217',
                  borderRadius: 10,
                  width: 80,
                  height: 40
                }} onPress={() => { logoutMyToken(); }}>
                  <Text style={{ color: '#393939',fontSize:13 }}>Sign Out</Text>
                </Pressable>
              </View>
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
    alignItems:'center',
    padding:20,
    width: 250,
    height: 160,
  },
  settingBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: "#696969",
    borderRadius: 50,
    marginBottom: 20,
  },
  settingbtnIcon: {
    padding: 10,
    color: '#696969'
  },
  settingbtnText: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#696969',
  },
});