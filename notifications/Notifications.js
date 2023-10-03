import React from 'react'
import { TextInput, ScrollView, StyleSheet, Text, FlatList, View, TouchableOpacity, } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


export default function Notifications() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ minHeight: 300, maxHeight: 290  }}>
        <TouchableOpacity style={styles.notiViews}  >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={styles.notiIcon}>
              <FontAwesomeIcons name="user-circle" size={20} color='#1C1C1C' />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.notiText}>Randall Johnsson</Text>
              <Text style={styles.timeText}>11: 04 :PM</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notiIcon: {
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
  ,  notiViews: {
    paddingTop: 10,
    paddingBottom: 10
}

});