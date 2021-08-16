import React,{useEffect,useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HeaderView from '../Components/HeaderView';
const Tab = createMaterialTopTabNavigator();
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Images from '../helper/images';

const HomeScreen = () => {
    const [currentPage, setCurrentPage] = useState("Login");
    return (
        // <ScrollView contentContainerStyle={{flex:1,backgroundColor:'#fff'}}>
        <View style={styles.container}>
            <View style={styles.HeaderView}>
             <HeaderView title={currentPage} img={currentPage=="Login"?Images.Login:Images.Signup}/>
            </View>
            <View style={styles.ContentView}>
                <Tab.Navigator
                 swipeEnabled={false}
                 tabBarOptions={{
                    activeTintColor: '#F47D56',
                    inactiveTintColor:'#B9B9B9',
            labelStyle: {
              fontSize: 12,
              fontFamily: 'FilsonPro-Bold',
            },
            tabStyle: { flex: 1 },
            upperCaseLabel: true,
            style: {
              backgroundColor: "#fff",
              elevation: 0,
              borderBottomWidth: 1,
              borderColor: "#B9B9B9",
            },
            indicatorStyle: { backgroundColor: "#F47D56", height: 2,marginTop:3 },
          }}>
                    <Tab.Screen  name="Login" component={Login} listeners={{
          tabPress: e => {
            setCurrentPage("Login")
          },
        }}/>
                    <Tab.Screen name="Signup" component={Signup} listeners={{
          tabPress: e => {
              setCurrentPage("Sign Up")
          },
        }}/>
                    {/* <Tab.Screen name="Home" component={Home} /> */}
                </Tab.Navigator>
            </View>
        </View>
        //  </ScrollView>
    )
}
export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column',backgroundColor:'#fff'
    },
    HeaderView:{
        flex:0.4
    },
    ContentView:{
        flex:0.6,
        width:'90%',
        marginLeft:'5%'
    }
});