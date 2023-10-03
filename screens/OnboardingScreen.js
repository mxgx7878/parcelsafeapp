import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import OnboardingImg from '../assets/images/onboardimg1.png';
import Video from 'react-native-video';

const Dots = ({ selected }) => {
  return (
    <View
      style={{
        width: 10,
        height: 10,
        marginHorizontal: 3,
        backgroundColor: selected ? '#EEC217' : '#cfcece',
        borderRadius: 100
      }}
    />
  );
}
const Skip = ({ ...props }) => (
  <TouchableOpacity
    style={{ marginHorizontal: 10 }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: '#272727', fontFamily: 'Poppins-Regular', paddingLeft: 10 }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity
    style={{ backgroundColor: '#EEC217', borderTopLeftRadius: 30, width: 100, height: 60, justifyContent: 'center', alignItems: 'center' }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: '#272727', fontFamily: 'Poppins-Regular' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity
    style={{ backgroundColor: '#EEC217', borderTopLeftRadius: 30, width: 100, height: 60, justifyContent: 'center', alignItems: 'center' }}
    {...props}
  >
    <Text style={{ fontSize: 16, color: '#272727', fontFamily: 'Poppins-Regular' }}>Done</Text>
  </TouchableOpacity>
);


const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <Onboarding
        bottomBarColor={'#FFFFFF'}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate("login")}
        onDone={() => navigation.navigate("login")}
        pages={[
          {

            image: <Image style={styles.onImage} source={OnboardingImg} />,
            title: <Text style={styles.onTitle}>Dummy Screen 1.</Text>,
            subtitle: <Text style={styles.onSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum has been the industry</Text>

          },
          {

            image: <Video repeat source={{ uri: "https://joy1.videvo.net/videvo_files/video/free/2012-09/large_watermarked/hd1627_preview.mp4" }} resizeMode="contain" ref={(ref) => { this.player = ref }} style={styles.video} />,
            title: <Text style={styles.onTitle}>Dummy Screen 2 with Video.</Text>,
            subtitle: <Text style={styles.onSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum has been the industry</Text>
          },
          {

            image: <Image style={styles.onImage} source={OnboardingImg} />,
            title: <Text style={styles.onTitle}>Dummy Screen 3.</Text>,
            subtitle: <Text style={styles.onSubTitle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry Ipsum has been the industry</Text>

          },
        ]}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  onImage: {
    width: 150,
    height: 300
  },
  onTitle: {
    width: '90%',
    fontSize: 18,
    fontWeight: '700',
    color: '#393939',
    marginBottom: 20,
    borderLeftWidth: 5,
    borderColor: "#EEC217",
    paddingLeft: 15,
    fontFamily: 'Poppins-Regular'


  },
  onSubTitle: {
    fontSize: 14,
    width: '90%',
    color: '#393939',
    fontFamily: 'Poppins-Regular'
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
});