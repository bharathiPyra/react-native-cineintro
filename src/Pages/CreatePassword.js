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
import * as yup from 'yup';
import HeaderView from "../Components/HeaderView";
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
const CreatePassword = (props) => {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState(false);
    const code = navigation.dangerouslyGetState().routes.find((route) => {
        return Boolean(route?.params?.code);
      })?.params?.code;
      console.log(
        "Stripe auth code",
        code,
        navigation.dangerouslyGetState().routes.find((route) => {
          return Boolean(route?.params?.code);
        })?.params?.code
      );
      console.log("oobcode",code);
    const loginSubmit = (values) => {
        firebase.auth().confirmPasswordReset(code, values.password)
    .then(function() {
      // Success
      console.log("password updated successfully")
    })
    .catch(error =>{
console.log("password error",error)
      // Invalid code
    })
        navigation.navigate("CompleteProfile");
    }
    const loginValidationSchema = yup.object().shape({
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
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
             <View style={styles.HeaderView}>
             <HeaderView title="Create Password" img={Images.Create_pwd} backArrow={true}/>
            </View>
            <View style={styles.container}>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{ password: '',confirm_password:''}}
                onSubmit={values => loginSubmit(values)}
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
                        <InputComp type={showPassword == false ? "password" : "text"} label="Enter New Password" value={values.password} onChangeText={handleChange('password')}
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
                        
                        <View style={{ paddingVertical: heightPercentageToDP('25%') }}>
                            <ButtonComp title="SUBMIT" onPress={handleSubmit} />
                        </View>
                    </>
                )}
            </Formik>
            </View>
        </ScrollView>
    )
}
export default CreatePassword;
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
    errMsg: {
        fontSize: 10, color: 'red'
    },
    container:{
        width:'90%',
        marginLeft:'5%',
        marginTop:heightPercentageToDP('5%')
    }
});