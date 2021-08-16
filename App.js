/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Routes from "./src/Routes";
import InputComp from "./src/Components/InputComp";
import ButtonComp from "./src/Components/ButtonComp";
import OTPinput from "./src/Pages/OTPinput"
import OtpInputs from 'react-native-otp-inputs';
const App = () => {
  const [value, setValue] = useState("");
  const changeText =(data)=>{
    setValue(data);
// set
    console.log("input",data);
  }
  return (
   <View style={{flex:1}}>
     {/* <OTPinput/> */}
     <Routes />
   </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
