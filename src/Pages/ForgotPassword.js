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
import { Formik, Field } from 'formik'
import HeaderView from "../Components/HeaderView";
import firebase from '@react-native-firebase/app';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import * as yup from 'yup'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
const ForgotPassword = (props) => {
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    // const ResetPassword = (values) => {
    //     return firebase.auth().sendPasswordResetEmail(values.email)
    // }
    const ResetPassword = async (values) => {
        firebase
    .auth()
    .sendPasswordResetEmail(values.email)
    .then(
      () => {
        // AlertMessage('Successfully sent the link');
        // onSuccess();
        setSuccessMsg("Successfully sent the link to your Registered Email")
        console.log("Successfully sent the link")
      },
      (err) => {
        const msg = err.message || 'Something went wrong. Try again later';
        setErrorMsg(msg);
        setErrorMsg("");
        console.log("error msg",msg);
        // onError ? onError(msg) : AlertMessage(msg);
      }
    )
    .catch((err) => {
      const msg = err.message || 'Something went wrong. Try again later';
      console.log("catch msg",msg)
      setErrorMsg(msg);
      setErrorMsg("");
    //   onError ? onError(msg) : AlertMessage(msg);
    });
    // var actionCodeSettings = {
    //     url: 'https://www.example.com/?email=' + firebase.auth().currentUser.email,
    //     iOS: {
    //       bundleId: 'com.cini_intro'
    //     },
    //     android: {
    //       packageName: 'com.cini_intro',
    //       installApp: true,
    //       minimumVersion: '12'
    //     },
    //     handleCodeInApp: true,
    //     // When multiple custom dynamic link domains are defined, specify which
    //     // one to use.
    //     dynamicLinkDomain: "suitupapp"
    //   };
    //   firebase.auth().currentUser.sendEmailVerification(actionCodeSettings)
    //     .then(function() {
    //       // Verification email sent.
    //     })
    //     .catch(function(error) {
    //       // Error occurred. Inspect error.code.
    //     });
      }
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
    })
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff' }}>
             <View style={styles.HeaderView}>
             <HeaderView title="Forgot Password" img={Images.forgotImg} backArrow={true}/>
            </View>
            <View style={styles.container}>
                <Text style={styles.forgotDesc}>Enter the Email address associated with your account</Text>
                            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ email: '', }}
                onSubmit={values => ResetPassword(values)}
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
                        <View style={{paddingBottom:hp('10%')}}>
                            <InputComp label="Email" value={values.email} onChangeText={handleChange('email')} keyboardType="email-address" />
                            {errors.email &&
                                <Text style={styles.errMsg}>{errors.email}</Text>
                            }
                        </View>

                      
                           <View><Text style={styles.successMsg}>{successMsg}</Text></View>
                           <View><Text style={styles.errMsg}>{errorMsg}</Text></View>
                        <View style={{ paddingVertical: 30 }}>
                            <ButtonComp disabled={successMsg!=''} title="NEXT" onPress={handleSubmit} />
                        </View>
                    </>
                )}
            </Formik>
            </View>

        </ScrollView>
    )
}
export default ForgotPassword;
const styles = StyleSheet.create({
    HeaderView:{
        flex:0.4
    },
    errMsg: {
        fontSize: 12, color: 'red',fontFamily:'Montserrat-Regular',
    },
    container:{
        width:'90%',
        marginLeft:'5%'
    },
    forgotDesc:{
        fontFamily:'Montserrat-Regular',
        textAlign:'center',
        fontSize:12,
        padding:30
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