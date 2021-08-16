import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Image, ImageBackground, TouchableOpacity, Modal
} from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonComp from '../Components/ButtonComp';
import InputComp from "../Components/InputComp";
import Images from '../helper/images';
import { Formik, Field } from 'formik';
import { useNavigation } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import * as yup from 'yup'
import { TouchableHighlight } from 'react-native-gesture-handler';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import { Autocomplete, AutocompleteItem, } from '@ui-kitten/components';
import ProfessionList from "../helper/ProfessionList.json";
import CountryPicker from 'react-native-country-picker-modal'
const CompleteProfile = () => {
  const initialFormValue = {
    profile_image: {
      isNew: false,
      file: null,
      prevImg: ''
    },
    whatsapp_no: "",
    web_url: "",
    platform: "",
    facebook_url: "",
    twitter_url: "",
    instagram_url: "",
    youtube_url: "",
    location_url: "",
    bio_content: "",
  };
  const movies = [
    { title: 'Star Wars' },
    { title: 'Back to the Future' },
    { title: 'The Matrix' },
    { title: 'Inception' },
    { title: 'Interstellar' },
  ];
  const navigation = useNavigation();
  const [profileImg, setProfileImg] = useState('');
  const [profileDetails, setProfileDetails] = useState(initialFormValue);
  const [data, setData] = React.useState(movies);
  const [modalVisible, setModalVisible] = useState(false);
  const loginSubmit = (data) => {
    
  }
  const phoneRegex = RegExp(
    /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  );
  const loginValidationSchema = yup.object().shape({
    whatsapp_no: yup.string().matches(phoneRegex, "Invalid Phone Number").required("Whatsapp Number is required"),
    web_url: yup.string(),
    platform: yup.string().trim().required("Profession is required"),
    facebook_url: yup.string(),
    twitter_url: yup.string(),
    instagram_url: yup.string().required("Instagram Handle Name is required"),
    youtube_url: yup.string(),
    location_url: yup.string().url("Enter Valid URL"),
    bio_content: yup.string().max(160, 'Bio field should contain maximum of 160 characters'),
  })
  const uploadFromGallery = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true
    }).then(image => {
      setProfileImg({
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      })
      console.log(image);
    });
  }
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setProfileImg({
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      })
      // bs.current.snapTo(1)
      setModalVisible(false);
    });
  }

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.7
    }).then(image => {
      console.log(image);
      setProfileImg({
        uri: image.path,
        width: image.width,
        height: image.height,
        mime: image.mime,
      })
      // bs.current.snapTo(1);
      setModalVisible(false);
    });
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      {/* <View style={{flexDirection:'column',justifyContent:'space-evenly'}}> */}
      <View style={{ marginBottom: 10 }}><ButtonComp title="Take Photo" onPress={() => takePhotoFromCamera()} /></View>
      <View style={{ marginBottom: 10 }}><ButtonComp title="Choose From Library" onPress={() => choosePhotoFromLibrary()} /></View>
      <View style={{ marginBottom: 10 }}><ButtonComp title="Cancel" onPress={() => setModalVisible(false)} /></View>
    </View>
  );
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#000' }}>
      {/* Header view */}
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={profileDetails}
        onSubmit={values => loginSubmit(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          setFieldValue,
          isValid,
        }) => (
          <>
            <View style={styles.headerView}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableHighlight underlayColor="none" onPress={() => { navigation.goBack() }}><Image source={Images.leftarrow_white} style={styles.arrowAlign} /></TouchableHighlight>
                <View><Text style={styles.headerText}>Complete Profile</Text></View>
              </View>
              <View><TouchableHighlight underlayColor="none" onPress={handleSubmit}><Image source={Images.CheckIcon} style={{ width: 18, height: 15 }} /></TouchableHighlight></View>
            </View>
            <Text style={styles.borderLine}>{""}</Text>
            <View style={{ padding: 20 }}>
              <View style={styles.ImageView}>
                <Image source={profileImg == '' ? Images.ProfileImg : profileImg} style={styles.profileIcon} />
              </View>
              <View style={styles.uploadImgView}><TouchableHighlight underlayColor="none" onPress={() => setModalVisible(true)}><Image source={Images.UploadIcon} style={styles.uploadImg} /></TouchableHighlight></View>
              <Text style={styles.uploadText}>Upload Profile Photo</Text>
            </View>
            <View style={styles.container}>

              <View >
                <InputComp profile={true} keyboardType="numeric" underlineColor="#B9B9B9" noBackground={true} label="Whatsapp" value={values.whatsapp_no} onChangeText={handleChange('whatsapp_no')} />
                {errors.whatsapp_no &&
                  <Text style={styles.errMsg}>{errors.whatsapp_no}</Text>
                }
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Website" value={values.web_url} onChangeText={handleChange('web_url')} />
                {errors.web_url &&
                  <Text style={styles.errMsg}>{errors.web_url}</Text>
                }
              </View>
              <View>
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Facebook" value={values.facebook_url} onChangeText={handleChange('facebook_url')} />
                {errors.facebook_url &&
                  <Text style={styles.errMsg}>{errors.facebook_url}</Text>
                }
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Twitter" value={values.twitter_url} onChangeText={handleChange('twitter_url')} />
                {errors.twitter_url &&
                  <Text style={styles.errMsg}>{errors.twitter_url}</Text>
                }
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Instagram" value={values.instagram_url} onChangeText={handleChange('instagram_url')} />
                {errors.instagram_url &&
                  <Text style={styles.errMsg}>{errors.instagram_url}</Text>
                }
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Youtube" value={values.youtube_url} onChangeText={handleChange('youtube_url')} />
                {errors.youtube_url &&
                  <Text style={styles.errMsg}>{errors.youtube_url}</Text>
                }
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Location" value={values.location_url} onChangeText={handleChange('location_url')} />
                {errors.location_url &&
                  <Text style={styles.errMsg}>{errors.location_url}</Text>
                }
              </View>
              <View >
                <InputComp underlineColor="#B9B9B9" noBackground={true} label="Bio" value={values.bio_content} onChangeText={handleChange('bio_content')} />
                {errors.bio_content &&
                  <Text style={styles.errMsg}>{errors.bio_content}</Text>
                }
              </View>

            </View>
            <Modal
              animated
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.overlay}>
                {renderInner()}
              </View>
            </Modal>
          </>

        )}
      </Formik>
      {/* </View> */}
    </ScrollView>
  )
}
export default CompleteProfile;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginLeft: '5%', flex: 1
  },
  errMsg: {
    fontSize: 10, color: 'red', marginTop: 8
  },
  headerView: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 17,
    paddingLeft: 15,
    paddingRight: 15,
    // padding:30
  },
  arrowAlign: {
    width: 16,
    height: 12,
    // marginTop:8,
    marginRight: 12
    //   paddingTop: 35,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 18,
    // paddingTop: 35,
    // marginLeft: 25,
    fontFamily: 'Montserrat-SemiBold'
  },
  borderLine: {
    borderBottomColor: '#3a3a3a',
    borderBottomWidth: 1
  },
  ImageView: {
    flexDirection: 'row',
    justifyContent: 'center',
    // position:'relative'
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  uploadText: {
    color: '#F47D56',
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'Montserrat-Regular'
  },
  uploadImgView: {
    position: 'absolute', left: heightPercentageToDP('32%'), bottom: heightPercentageToDP('9%')
  },
  uploadImg: {
    height: 25,
    width: 25,

  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 18,
    paddingVertical: 7,
    fontFamily: 'Montserrat-SemiBold'
  },
  panelSubtitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#717171',
    fontFamily: 'Montserrat-Regular'
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  countrycodeText: {
    color: "#B9B9B9",
  }
});