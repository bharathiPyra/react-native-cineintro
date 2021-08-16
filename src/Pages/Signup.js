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
import CountryPicker from 'react-native-country-picker-modal';
import auth from '@react-native-firebase/auth';
import * as yup from 'yup'
import { SegmentedControlIOSComponent } from 'react-native';
const Signup = () => {
    const navigation = useNavigation();
    const [countryCode, setCountryCode] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");



    const SendOTPtoMobile =(values)=>{
        fetch("https://api.cineintro.com/dev/app/sendOtp", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				country_code:countryCode?.callingCode[0],email:values.email,mobile_no:values.mobile_no
			}),
		})
			// )
			.then((response) => response.json())
			.then((jsonResponse) => {
                if(jsonResponse.statusCode==200){
                    navigation.navigate("OTP",{registerValues:values,CountryCode:countryCode?.callingCode[0]});
                }else{
                    setErrorMsg(jsonResponse.message); 
                    setSuccessMsg("");  
                }
                console.log("otp response",jsonResponse);
            })
    }
    const SignupAPICall =(data,values)=>{
         var obj={uid:data,country_code:countryCode?.callingCode[0],name:values.name,email:values.email,mobile_no:values.mobile_no};
        fetch("https://api.cineintro.com/dev/app/register", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				uid:data,country_code:countryCode?.callingCode[0],name:values.name,email:values.email,mobile_no:values.mobile_no
			}),
		})
			// )
			.then((response) => response.json())
			.then((jsonResponse) => {
                if(jsonResponse.statusCode==200){
                    SendOTPtoMobile(values);
                    setErrorMsg("");
                }else{
                    setErrorMsg(jsonResponse.message); 
                    setSuccessMsg(""); 
                }
				// alert(JSON.stringify(jsonResponse))
				console.log("device token respose",jsonResponse);
			})
    }
    const checkUserExists =(values)=>{
       fetch("https://api.cineintro.com/dev/app/checkRegisterExist", {
           method: "POST",
           headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
           },
           body: JSON.stringify({
               country_code:countryCode?.callingCode[0],name:values.name,email:values.email,mobile_no:values.mobile_no
           }),
       })
           // )
           .then((response) => response.json())
           .then((jsonResponse) => {
               if(jsonResponse.statusCode==200){
                SignupAPICall(res.user.uid,values);
                   setErrorMsg("");
               }else{
                   setErrorMsg(jsonResponse.message); 
                   setSuccessMsg(""); 
               }
               // alert(JSON.stringify(jsonResponse))
               console.log("device token respose",jsonResponse);
           })
   }
    const registerData = async(values) => {
       
            registerValues(values)
    }
    const registerValues = async(values)=>{
        if(countryCode==''){
            alert("Please Select Country Code")
        }else{

        
        auth()
  .createUserWithEmailAndPassword(values.email, values.password)
  .then((res) => {
    setSuccessMsg("User account created & signed in!");
    // navigation.navigate("OTP");
    checkUserExists(values)
    // SignupAPICall(res.user.uid,values);
    setErrorMsg("");
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      setErrorMsg('That email address is already in use!');
      setSuccessMsg("");
    }

    if (error.code === 'auth/invalid-email') {
        setErrorMsg('That email address is invalid!');
      setSuccessMsg("");
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
 
}
    }
    const phoneRegex = RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );

    const loginValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required('Name is Required'),
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),

            mobile_no: yup.string().matches(phoneRegex, "Invalid phone").required("Phone is required"),
        confirm_password: yup.string().min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Confirm Password is required').when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: yup.string().oneOf(
                    [yup.ref("password")],
                    "Both password need to be the same"
                )
            })
    })
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ name: '', email: '', password: '', confirm_password: '', mobile_no: '', }}
                onSubmit={values => registerData(values)}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                }) => (
                    <>
                        <View >
                            <InputComp label="Name" value={values.name} onChangeText={handleChange('name')} />
                            {errors.name &&
                                <Text style={styles.errMsg}>{errors.name}</Text>
                            }
                        </View>
                        <View >
                            <InputComp label="Email" value={values.email} onChangeText={handleChange('email')} keyboardType="email-address" />
                            {errors.email &&
                                <Text style={styles.errMsg}>{errors.email}</Text>
                            }
                        </View>
                     <View style={{padding:10,borderBottomColor:'#ccc',borderBottomWidth:1}}>
                                <CountryPicker 
                                withFilter
                                    withFlag
                                    withCountryNameButton
                                    withAlphaFilter
                                    withCallingCode
                                    withEmoji
                                onSelect={(country) => setCountryCode(country)}
                                style={{color:'red'}}
                                />
                                <Text style={styles.countrycodeText}>{countryCode!=null? "+" :""} {countryCode?.callingCode[0]}</Text>
                            </View> 
                            
                        <View>
                            <InputComp label="Phone" keyboardType="numeric" value={values.mobile_no} onChangeText={handleChange('mobile_no')} />
                            {errors.mobile_no &&
                                <Text style={styles.errMsg}>{errors.mobile_no}</Text>
                            }
                        </View>
                        <View >
                            <InputComp type={showPassword == false ? "password" : "text"} label="Password" value={values.password} onChangeText={handleChange('password')}
                                right={<TextInput.Icon onPress={() => setShowPassword(!showPassword)} name={() => <Image source={showPassword == false ? Images.eye_off : Images.eye_on} style={styles.pwd_icon} />} />} />
                            {errors.password &&
                                <Text style={styles.errMsg}>{errors.password}</Text>
                            }
                        </View>
                        <View >
                            <InputComp type={confirmPassword == false ? "password" : "text"} label="Confirm Password" value={values.confirm_password} onChangeText={handleChange('confirm_password')}
                                right={<TextInput.Icon onPress={() => setConfirmPassword(!confirmPassword)} name={() => <Image source={confirmPassword == false ? Images.eye_off : Images.eye_on} style={styles.pwd_icon} />} />} />
                            {errors.confirm_password &&
                                <Text style={styles.errMsg}>{errors.confirm_password}</Text>
                            }
                        </View>
                        <Text style={styles.ORText}>OR</Text>

                        <View style={styles.socialLogins}>
                            <Image source={Images.facebook} style={styles.socialIcons} />
                            <Image source={Images.twitter} style={styles.socialIcons} />
                            <Image source={Images.google} style={styles.socialIcons} />
                        </View>
                        <View><Text style={styles.successMsg}>{successMsg}</Text></View>
                           <View><Text style={styles.errorMsg}>{errorMsg}</Text></View>
                        <View style={{ paddingVertical: 30 }}>
                            <ButtonComp title="SIGN UP" onPress={handleSubmit} />
                        </View>
                    </>
                )}
            </Formik>
        </ScrollView>
    )
}
export default Signup;
const styles = StyleSheet.create({
    pwd_icon: {
        width: 18,
        height: 12,
    },
    forgotText: {
        color: '#F47D56',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'right',
        paddingVertical: 10
    },
    ORText: {
        color: '#000000',
        opacity: 0.4,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 10,
        textAlign: 'center',
        paddingVertical: 10
        // opacity: '0.4'
    },
    socialLogins: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    socialIcons: {
        width: 40,
        height: 40,
        marginRight: 10
    },
    errMsg: {
        fontSize: 10, color: 'red',
    },
    countrycodeText:{
        color:"#000",
    },
    errorMsg: {
        fontSize: 12, color: 'red',fontFamily:'Montserrat-Regular',textAlign:'center'
    },
    successMsg:{
        color:'#01ADCB',
        fontSize: 12,
        textAlign:'center',
        fontFamily:'Montserrat-Regular',
    }
});