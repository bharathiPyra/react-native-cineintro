import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image,TouchableHighlight,ImageBackground
} from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonComp from '../Components/ButtonComp';
import InputComp from "../Components/InputComp";
import Images from '../helper/images';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import { TouchableOpacity } from 'react-native';
const NewsFeed = () => {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
   const HeaderView = () =>{
       return(
           <View>
           <View style={styles.header}>
               <TouchableHighlight><Image source={Images.EditProfile} style={styles.profileEdit}/></TouchableHighlight>
               <View style={{width:100,height:50}}><Image source={Images.Logo} style={styles.logoStyle}/></View>
               <TouchableHighlight><Image source={Images.Search} style={styles.searchIcon}/></TouchableHighlight>
           </View>
           <Text style={styles.borderLine}>{""}</Text>
           </View>
       )
   }
   const NewsFeedHeader = (data) =>{
       console.log("data",data);
    return(
        <View style={styles.NewsfeedHeader}>
           <View style={{flex:0.2}}>
               <View>
                   <TouchableHighlight><Image source={Images.ProfileImg} style={styles.profileView}/></TouchableHighlight>
                    </View>
                    <View style={{position:'absolute',right:5,bottom:0}}><Image source={Images.Recruit} style={{width:30,height:30}}/></View>
 
           </View>
           <View style={{flex:0.8}}>
               <View style={{flexDirection:'row',alignItems:'center'}}>
                   <Text style={styles.title}>Danielle Jackson</Text>
                   <Text style={styles.dotClass}></Text>
                   <Text style={[styles.recuiter,{color:data=='Recruiter'?'#E29C0C':'#01ADCB'}]}>{data=='Recruiter'?'Recruiter':'Celebrity'}</Text>
                   </View>
                   <Text style={styles.timeDisplay}>1h ago</Text>
                   </View>
        </View>
    )
}
const LikeComments = ()=>{
    return(
        <View style={{flexDirection:'row',padding:20,alignItems:'center',backgroundColor:'#1B1B1B'}}>
<View style={{flexDirection:'row',alignItems:'center',flex:0.5}}><TouchableOpacity><Image source={Images.ThumbsUp} style={{width:20,height:20}}/></TouchableOpacity>
<Text style={styles.likeCount}>876</Text></View>
<View style={{flex:0.5,justifyContent:'flex-end',}}><Text style={[styles.likeCount,{textAlign:'right'}]}>5 Comments</Text></View>
        </View>
    )
}
const LikeCommentShare = ()=>{
    return(
        <View style={styles.likecommentshare}>
<View style={{flexDirection:'row',alignItems:'center'}}><TouchableOpacity><Image source={Images.LikeInactive} style={{width:20,height:20}}/></TouchableOpacity>
<Text style={styles.likeCount}>Like</Text></View>
<View style={{flexDirection:'row',alignItems:'center',}}><TouchableOpacity><Image source={Images.commentIcon} style={{width:20,height:20}}/></TouchableOpacity>
<Text style={styles.likeCount}>Comment</Text></View>
<View style={{flexDirection:'row',alignItems:'center'}}><TouchableOpacity><Image source={Images.ShareIcon} style={{width:20,height:20}}/></TouchableOpacity>
<Text style={styles.likeCount}>Share</Text></View>
        </View>
    )
}
const AuditoriumButton = ()=>{
    return(
        <View style={{flexDirection:'row',alignItems:'center',paddingTop:15,paddingLeft:8,paddingRight:8,paddingBottom:15}}>
            <View style={{flex:0.2}}><Text style={{borderBottomWidth:1.5,borderBottomColor:'#B9B9B9',opacity:0.5}}>{""}</Text></View>
            <View style={{flex:0.6,marginLeft:10,marginRight:10}}>
            <ImageBackground source={Images.Auditorium} style={styles.AuditoriumStyle}>  
    <Text style={styles.auditionText}>Audition</Text>
    <TouchableHighlight><Image source={Images.Audition} style={styles.auditionImg}/></TouchableHighlight> 
  </ImageBackground> 
  </View>
            <View style={{flex:0.2}}><Text style={{borderBottomWidth:1.5,borderBottomColor:'#B9B9B9',opacity:0.5}}>{""}</Text></View>
        </View>
    )
}
    return (
        <>
        {HeaderView()}
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#000',}}>
           {NewsFeedHeader('Recruiter')}
           <View style={{backgroundColor:'#1B1B1B'}}><Text style={styles.description}>Aliquam in bibendum mauris. Sed vitae erat vel velit blandit pharetra vitae nec ante. Cras at est augue. Cras ut interdum eli.</Text>
           <Image source={Images.NewsfeedImg} style={{width:'100%',height:200,paddingLeft:20,paddingRight:20,borderRadius:8}}/>
           {LikeComments()}
           <Text style={{borderBottomWidth:1.5,borderBottomColor:'#B9B9B9',opacity:0.5}}>{""}</Text>
           </View>
           {LikeCommentShare()}
           {AuditoriumButton()}
           {NewsFeedHeader('Celebrity')}
        </ScrollView>
        </>
    )
}
export default NewsFeed;
const styles = StyleSheet.create({
 header:{
     flexDirection:'row',
     justifyContent:'space-between',
     alignItems:'center',
     backgroundColor:'#1B1B1B',
     paddingTop:20,
     paddingRight:20,
     paddingLeft:20
    //  padding:20
 },
 profileEdit:{
     width:40,
     height:40,
     borderRadius:20
 } ,
 searchIcon:{
     height:20,
     width:20
 } ,
 logoStyle:{
     width:'100%',height:'100%'
 },
 borderLine:{
    borderBottomWidth :1,
    borderBottomColor: '#1B1B1B',
    backgroundColor: '#1B1B1B',
 },
 NewsfeedHeader:{
     flexDirection:'row',
     padding:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#1B1B1B'
 },
 profileView:{
     width:60,
     height:60,
     borderRadius:30
 },
 title:{
     color:'#fff',
     fontSize:16,
     marginLeft:8,
     fontFamily:'Montserrat-SemiBold'
 },
 dotClass:{
     width:10,
     height:10,
backgroundColor:'#333',
borderRadius:5,
marginLeft:8,
marginRight:8
 },
 recuiter:{
     fontSize:14,
     fontFamily:'Montserrat-Medium'
 },
 timeDisplay:{
     color:'#717171',
     marginHorizontal:8,
     fontFamily:'Montserrat-SemiBold'
 },
 description:{
     color:'#B9B9B9',
     fontSize:13,
     fontFamily:'Montserrat-Medium',
     paddingLeft:20,
     paddingRight:20,
     lineHeight:20,
     backgroundColor:'#1B1B1B'
 },
 likeCount:{
    color: '#B9B9B9',
    marginLeft:10,
    fontFamily:'Montserrat-Medium',
    backgroundColor:'#1B1B1B'
 },
 likecommentshare:{
    flexDirection:'row',alignItems:'center',backgroundColor:'#1B1B1B',justifyContent:'space-between',padding:20
 },
 auditionText:{
     color:'#F47D56',
     fontFamily:'Montserrat-SemiBold',
     fontSize:16
 },
 auditionImg:{
     width:22,height:22,
     marginLeft:10
 },
 AuditoriumStyle:{
    height: 65,borderRadius:8,flex:0.4,flexDirection:'row',justifyContent:'center',alignItems:'center'
 }
});