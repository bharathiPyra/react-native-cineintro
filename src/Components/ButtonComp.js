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
// import { makeStyles } from '@material-ui/core/styles';
import { Button } from 'react-native-elements';
const ButtonComp
 = (props)=>{
    return(
<View>

 <Button variant="contained" buttonStyle={styles.buttonStyle} containerStyle={{borderRadius:10}} {...props} style={props.style} titleStyle={styles.titleStyle} title={props.title}></Button> 
</View>
    )
}
export default ButtonComp
;
const styles = StyleSheet.create({
buttonStyle:{
  backgroundColor:'#F47D56',padding:16,borderRadius:30
},
titleStyle:{
  fontFamily:'Montserrat-SemiBold',fontSize:12
}
})