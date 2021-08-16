import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image
} from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonComp from '../Components/ButtonComp';
import InputComp from "../Components/InputComp";
import Images from '../helper/images';
import { Formik, Field } from 'formik';
import { useNavigation } from "@react-navigation/native";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import HeaderView from "../Components/HeaderView";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as yup from 'yup'
import { TouchableHighlight } from 'react-native-gesture-handler';
const OTPinput = (props) => {
    const navigation = useNavigation();
    let intervaltimer = null;
    let timertrigger = 24;
    const [timer, setTimer] = useState("24");
    const [code, setCode] = useState("");
    const [disabled, setdisabled] = React.useState(true);
    const [errorMsg, setErrorMsg] = React.useState(false);
    const registerDatas=props?.route?.params.registerValues;
    const ccode=props?.route?.params.CountryCode;
    console.log("props",JSON.stringify(props));
    const interval = {

        start: function () {
            var self = this;
            intervaltimer = setInterval(function () {

                var newtimer = timertrigger--;
                if (newtimer != 0) {
                    setTimer(newtimer);
                } else {
                    self.stop();
                }
            }, 1000)
        },
        stop: () => {

            setdisabled(false);

            timertrigger = 0;
            setTimer(timertrigger);
            clearInterval(intervaltimer)
        }
    }
    useEffect(() => {
        interval.start();
        console.log("registerdata",ccode);
    }, [])
    const resendOTP = () => {
        if (disabled === false) {
            clearInterval(intervaltimer);
            interval.start();
            timertrigger = 24;
            setTimer(timertrigger);
            
        }
        fetch("https://api.cineintro.com/dev/app/resendOtp", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({country_code:ccode,email:registerDatas.email,mobile_no:registerDatas.mobile_no})
            })
                // )
                .then((response) => response.json())
                .then((jsonResponse) => {
                    if(jsonResponse.statusCode==200){
                        setErrorMsg("");
                    }else{
                        setErrorMsg(jsonResponse.message); 
                    }
                    // alert(JSON.stringify(jsonResponse))
                    console.log("device token respose",jsonResponse);
                })
    }
    const gotoNext =()=>{
        if(code.length<4){
        setErrorMsg(true);
        }else{
            fetch("https://api.cineintro.com/dev/app/verifyOtp", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({country_code:ccode,email:registerDatas.email,mobile_no:registerDatas.mobile_no,otp:code})
		})
			// )
			.then((response) => response.json())
			.then((jsonResponse) => {
                if(jsonResponse.statusCode==200){
                    setErrorMsg("");
                }else{
                    setErrorMsg(jsonResponse.message); 
                }
				// alert(JSON.stringify(jsonResponse))
				console.log("device token respose",jsonResponse);
			})
        // navigation.navigate("CreatePassword");
        }
    }
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
            <View style={styles.HeaderView}>
                <HeaderView title="OTP" img={Images.OTP} backArrow={true} />
            </View>
            <View style={styles.container}>
                <Text style={styles.forgotDesc}>Enter the verification code we just sent to your email address</Text>

                <OTPInputView
                    style={{ height: 100, color: 'red' }}
                    pinCount={4}
                    placeholderTextColor={styles.color}
                    code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                    onCodeChanged={code => setCode(code) }
                    autoFocusOnLoad
                    codeInputFieldStyle={styles.underlineStyleBase}
                    // codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    // onCodeFilled={(code => onFilledValidation(code))} 
                    />
                    

                <View style={styles.resendCode}>
                    <View style={{ flexDirection: 'row' }}><Text style={styles.timedisplay}>Time Left : </Text><Text style={[styles.timedisplay,{color:'#F47D56'}]}>{timer}S</Text></View>
                    <TouchableHighlight disabled={disabled} onPress={() => resendOTP()}><Text style={disabled ? [styles.timedisplay, { color: "#bbb" }] : [styles.timedisplay, { color: "#F47D56" }]} >Resend Code?</Text></TouchableHighlight>
                </View>
                {errorMsg==true&&
                    <Text style={styles.errMsg}>Please Enter the OTP.</Text>
                    }
                <View style={{ marginTop: hp('10%') }}>
                    <ButtonComp title="VERIFY OTP" onPress={()=>gotoNext()}/>
                </View>
            </View>

        </ScrollView>
    )
}
export default OTPinput;
const styles = StyleSheet.create({
    HeaderView: {
        flex: 0.4
    },
    errMsg: {
        fontSize: 10, color: 'red',paddingTop:10
    },
    container: {

        width: '90%',
        marginLeft: '5%',
    },
    forgotDesc: {
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        fontSize: 12,
        paddingLeft: hp('8%'),
        paddingRight: hp('8%')
        // padding:30
    },
    borderStyleBase: {
        width: 30,
        height: 45
    },

    borderStyleHighLighted: {
        borderColor: "#03DAC6",
    },

    underlineStyleBase: {
        backgroundColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 5,
        color: '#000'
        // borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
    resendCode: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    timedisplay: {
        color: '#717171',
        fontSize: 12,
        fontFamily: 'Montserrat-SemiBold'
    }
});