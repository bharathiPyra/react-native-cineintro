import React ,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
// import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper';
const InputComp = (props)=>{
  const [focus, setFocus] = useState(false);
  const onChangeText =(data)=>{
    console.log("input data",data);
  }
    return(
<View>
<TextInput

      label={props.label}
      {...props}
      // style={{backgroundColor:'white'}}
      style={{backgroundColor:props.noBackground==true?"rgba(0,0,0,0.4)":'white'}}
      value={props.value}
      theme={{ colors: { text: props.profile==true?"#B9B9B9":"#000", accent: "#B9B9B9", placeholder: "#B9B9B9",primary: "#B9B9B9" } }}
      secureTextEntry={props.type=='password'?true:false} 
      // onChangeText={(data)=>onChangeText(data)}
    />
{/* <Button variant="contained" {...props} titleStyle={{fontFamily:'Montserrat-SemiBold'}} title={props.title}></Button> */}
</View>
    )
}
export default InputComp;