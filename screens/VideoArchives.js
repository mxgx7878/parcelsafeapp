import { TouchableOpacity, Text, ScrollView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

export default function VideoArchives() {
    const navigation = useNavigation();
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
              <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF"/>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.camBtn} onPress={()=> navigation.navigate('safe-videos')}>
                    <Text style={styles.camText}>Safe # 1 </Text>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.camBtn} onPress={()=> navigation.navigate('safe-videos')}>
                    <Text style={styles.camText}>Safe # 1 </Text>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.camBtn} onPress={()=> navigation.navigate('safe-videos')}>
                    <Text style={styles.camText}>Safe # 1 </Text>
                    <MaterialIcons style={styles.camIcon} name="chevron-right" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.camBtn} onPress={()=> navigation.navigate('safe-videos')}>
                    <Text style={styles.camText}>Safe # 1 </Text>
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
    marginTop:20,
    backgroundColor:'#EEC217',
    height:45
  },
  camIcon: {
    padding: 7,
    backgroundColor:'#1C1C1C',
    borderWidth: 1,
    borderRadius: 50,
    marginRight:3
    
  },
      camText: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        color: '#1C1C1C',
      },

})