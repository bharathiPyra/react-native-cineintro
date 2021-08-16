import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Image
} from 'react-native';
import Images from "../helper/images" ;
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { useNavigation } from "@react-navigation/native";
import { TouchableHighlight } from 'react-native-gesture-handler';
const HeaderView = (props)=>{
    const navigation = useNavigation();
    return(
<View>
<View style={styles.borderCls}>
        <View style={styles.headerBox}>
            {props.backArrow==true&&
            <TouchableHighlight underlayColor="none" onPress={()=>{navigation.goBack()}}><Image source={Images.leftarrow_white} style={styles.arrowAlign}/></TouchableHighlight>}
          <Text style={styles.loginText}>{props.title}</Text>
        </View>
        <View style={styles.centerImage}>
        <Image source={props.img} alt='img' style={{width:200,height:200,resizeMode:'contain'}}/>
        </View>
      </View>
</View>
    )
}
export default HeaderView;
const styles = StyleSheet.create({
    borderCls: {
        backgroundColor: '#D3D3D3',
        height: 210,
        position: 'relative',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
      },
      headerBox: {
        backgroundColor: '#1B1B1B',
        minHeight: 200,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,flexDirection:'row',
        paddingTop:25,
        paddingLeft:20
      },
      loginText: {
        color: '#FFFFFF',
        fontSize: 18,
        // paddingTop: 35,
        // marginLeft: 25,
        fontFamily:'Montserrat-SemiBold'
      },
      centerImage: {
        // width: wp('70%'),
        // height:hp('40%'),
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
        top:40,
        marginLeft: 'auto',
        marginRight: 'auto',
        // left: '22%',
        right: 0,
        left:0,
        
        // textAlign: 'center'
      },
      arrowAlign:{
          width:16,
          height:12,
          marginTop:5,
          marginRight:8
        //   paddingTop: 35,
      }
});