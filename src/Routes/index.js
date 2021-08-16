import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Pages/Login";
import ForgotPassword from "../Pages/ForgotPassword";
import OTPinput from "../Pages/OTPinput";
import HomeScreen from "../Pages/HomeScreen";
import CreatePassword from '../Pages/CreatePassword';
import CompleteProfile from '../Pages/CompleteProfile';
import HomePage from '../Pages/HomePage';
import NewsFeed from "../Pages/NewsFeed";
const Stack = createStackNavigator();
const Routes = ()=>{
  const deepLinking = {
    // http://18.224.15.118:3000/sessions/reset-password/
    // prefixes:['https://deepLinking.com', 'deepLinking://'],
    prefixes: [
      "http://188.166.228.50/",
      "https://ciniintro",
      "myapp://",
    ],
    config: {
      CreatePassword: {
        path: "CreatePassword/:code",
        params: { code: null },
      },
    },
  };
    return(
    <NavigationContainer linking={deepLinking}>
    <Stack.Navigator initialRouteName="HomeScreen" headerMode={false}>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                />
                  <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                />
                <Stack.Screen
                  name="OTP"
                  component={OTPinput}
                /> 
                <Stack.Screen
                  name="CreatePassword"
                  component={CreatePassword}
                /> 
                <Stack.Screen
                  name="CompleteProfile"
                  component={CompleteProfile}
                /> 
                 <Stack.Screen
                  name="HomePage"
                  component={HomePage}
                /> 
                 <Stack.Screen
                  name="NewsFeed"
                  component={NewsFeed}
                /> 
                </Stack.Navigator>
    </NavigationContainer>
    )
}
export default Routes;