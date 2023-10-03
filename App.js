import React from 'react';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ForgotPassword from './auth/ForgotPassword';
import Updatepass from './auth/Updatepass';
import Verification from './auth/Verification';
import SafeConfiguration from './configuration/SafeConfiguration';
import CreateAccount from './users/CreateAccount';
import ReportIssue from './screens/ReportIssue';
import UserDetails from './users/UserDetails';
import VideoArchives from './screens/VideoArchives';
import BottomTabs from './components/BottomTabs';
import OnboardingScreen from './screens/OnboardingScreen';
import Subscription from './screens/Subscription';
import CarrierSetting from './screens/CarrierSetting';
import NotificationScreen from './notifications/NotificationScreen';
import Notifications from './notifications/Notifications';
import NotificationDetails from './notifications/NotificationDetails';
import AvailableSafes from './configuration/AvailableSafes';
import AccountSetting from './screens/AccountSetting';
import SafeVideos from './screens/SafeVideos';
import VideoPlayScreen from './screens/VideoPlayScreen';

const Stack = createNativeStackNavigator();
const Auth = () => {
  
  return (

    <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen name="OnboardingScreen" options={{ headerShown: false }} component={OnboardingScreen} />
      <Stack.Screen name="login" options={{ headerShown: false }} component={Login} />
      <Stack.Screen name="signup" options={{ title: 'Sign Up' }} component={Signup} />
      <Stack.Screen name="forgotPassword" options={{ headerShown: false }} component={ForgotPassword} />
      <Stack.Screen name="verification" options={{ headerShown: false }} component={Verification} />
    </Stack.Navigator>
  );
};
export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      // background: 'rgb(242, 242, 242)',
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="SplashScreen" >
        <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
        <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="updatepass" options={{ headerShown: false }} component={Updatepass} />
        <Stack.Screen name="notification-screen" options={{ title: 'Notifications' }} component={NotificationScreen} />
        <Stack.Screen name="notification" component={Notifications} />
        <Stack.Screen name="notification-details" options={{ title: 'Notification Detail' }} component={NotificationDetails} />
        <Stack.Screen name="configuration" options={{ title: 'Configuration Safe' }} component={SafeConfiguration} />
        <Stack.Screen name="available-safes" options={{ title: 'Available Safes' }} component={AvailableSafes} />
        <Stack.Screen name="CreateAccount" options={{ title: 'Create Account' }} component={CreateAccount} />
        <Stack.Screen name="reportIssue" options={{ title: 'Report An Issue' }} component={ReportIssue} />
        <Stack.Screen name="UserDetails" options={{ title: 'User Details' }} component={UserDetails} />
        <Stack.Screen name="videoArchives" options={{ title: 'Video Archives' }} component={VideoArchives} />
        <Stack.Screen name="safe-videos" options={{ title: 'Safe Videos' }} component={SafeVideos} />
        <Stack.Screen name="subscription" options={{ title: 'Subscription Plans' }} component={Subscription} />
        <Stack.Screen name="carrier-setting" options={{ title: 'Carrier Setting' }} component={CarrierSetting} />
        <Stack.Screen name="accoun-setting" options={{ title: 'Account Settings' }} component={AccountSetting} />
        <Stack.Screen name="video-play" options={{
          title: '',
          headerStyle: {
            backgroundColor: '#000000',
          },
          
          headerTintColor: '#FFFFFF',
        }} component={VideoPlayScreen}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

