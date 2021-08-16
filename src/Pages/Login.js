import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image,ActivityIndicator,Alert
} from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonComp from '../Components/ButtonComp';
import InputComp from "../Components/InputComp";
import Images from '../helper/images';
import { Formik, Field,FormikHelpers } from 'formik'
import * as yup from 'yup';
import { useNavigation ,useIsFocused} from "@react-navigation/native";
import { TouchableHighlight } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import AsyncStorage from "@react-native-community/async-storage";
import '@react-native-firebase/crashlytics';
const Login = () => {
    const IsFocused=useIsFocused;
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    // const loginSubmit = (data) => {
    //     console.log("values", data);
    // }
    if(IsFocused){
        firebase.crashlytics().crash();
    }
    useEffect(() => {
        firebase.crashlytics().crash();
		const unsubscribe = navigation.addListener("focus", () => {
            setSuccessMsg("");
            navigation.navigate("HomeScreen")
		});
		return () => {
			// Clear setInterval in case of screen unmount
			// Unsubscribe for the focus Listener
			unsubscribe;
		};
	}, []);
    const loginAPICall =(data)=>{
        console.log("login response",data);
        
        fetch("https://api.cineintro.com/dev/app/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({uid:data})
		})
			// )
			.then((response) => response.json())
			.then((jsonResponse) => {
                if(jsonResponse.statusCode==200){
                    AsyncStorage.setItem('Token',jsonResponse.token);
                    setErrorMsg("");
                    navigation.navigate('HomePage');
                }else{
                    setErrorMsg(jsonResponse.message); 
                }
				// alert(JSON.stringify(jsonResponse))
				console.log("device token respose",jsonResponse.data);
			})
    }
    const loginSubmit = async (values,{resetForm}) => {
        setShowLoading(true);
        auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((res) => {
            console.log("fiebase res",res);
        //   setSuccessMsg("User logged in!");
        //   navigation.navigate('HomePage');
          setShowLoading(false);
          setErrorMsg("");
          loginAPICall(res.user.uid)
          resetForm(values);
        })
        .catch(error => {
            setShowLoading(false);
          if (error.code === 'auth/user-not-found') {
            setErrorMsg('There is no user record corresponding to this identifier. The user may have been deleted');
            setSuccessMsg("");
          }
      
          if (error.code === 'auth/wrong-password') {
              setErrorMsg('The password is invalid or the user does not have a password');
            setSuccessMsg("");
            console.log('That email address is invalid!');
          }
      
          console.error(error);
        });
      };
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })
    
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: '', password: '' }}
                onSubmit={(values,actions) => loginSubmit(values,actions)}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    handleReset,
                    values,
                    touched,
                    isInvalid,
                    isSubmitting,
                    isValidating,
                    submitCount,
                    errors
                }) => (
                    <>
                        <View >
                            <InputComp label="Email" value={values.email} onChangeText={handleChange('email')} keyboardType="email-address" />
                            {errors.email &&
                                <Text style={styles.errMsg}>{errors.email}</Text>
                            }
                        </View>

                        <View >
                            <InputComp type={showPassword == false ? "password" : "text"} label="Password" value={values.password} onChangeText={handleChange('password')}
                                right={<TextInput.Icon onPress={() => setShowPassword(!showPassword)} name={() => <Image source={showPassword == false ? Images.eye_off : Images.eye_on} style={styles.pwd_icon} />} />} />
                            {errors.password &&
                                <Text style={styles.errMsg}>{errors.password}</Text>
                            }
                        </View>
                        <TouchableHighlight underlayColor="none" onPress={()=>{navigation.navigate("ForgotPassword")}}><Text style={styles.forgotText} >Forgot Password?</Text></TouchableHighlight>
                        <Text style={styles.ORText}>OR</Text>

                        <View style={styles.socialLogins}>
                            <Image source={Images.facebook} style={styles.socialIcons} />
                            <Image source={Images.twitter} style={styles.socialIcons} />
                            <Image source={Images.google} style={styles.socialIcons} />
                        </View>
                        <View><Text style={styles.successMsg}>{successMsg}</Text></View>
                           <View><Text style={styles.errorMsg}>{errorMsg}</Text></View>
                        <View style={{ paddingVertical: 20 }}>
                            <ButtonComp title="LOGIN" onPress={handleSubmit} />
                        </View>
                    </>
                )}
            </Formik>
            
            {showLoading &&
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
        </ScrollView>
    )
}
export default Login;
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
        fontSize: 10, color: 'red'
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
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