import React, { useEffect } from 'react';
import { View, StyleSheet, Image, StatusBar, Animated } from 'react-native';
import Logo from '../assets/images/applogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SplashScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [fadeAnim] = React.useState(new Animated.Value(0));
  const [scaleAnim] = React.useState(new Animated.Value(0));

  useEffect(() => {
    // Preload the Auth screen when the SplashScreen is mounted
    if (route.name === 'Auth') {
      navigation.navigate('Auth');
    }

    // Start animations and navigate after a delay
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const navigationTimeout = setTimeout(() => {
      AsyncStorage.getItem('token').then((value) =>
        navigation.replace(value === null ? 'Auth' : 'BottomTabs'),
      );
    }, 2500);

    return () => clearTimeout(navigationTimeout);
  }, [route, navigation, fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
     <StatusBar barStyle="Light-content" backgroundColor="#FFFFFF" />
      <Animated.Image
        source={Logo}
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    resizeMode: 'contain',
    aspectRatio: 2.5, 
    maxWidth: '60%'
  },
});

export default SplashScreen;
