import React,{useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import ButtonComp from "../Components/ButtonComp";
import AsyncStorage from "@react-native-community/async-storage";
import { useNavigation } from "@react-navigation/native";
const HomePage = () => {
    const navigation = useNavigation();
    const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const  onAuthStateChanged = (user) =>{
    setUser(user);
    if (initializing) setInitializing(false);
  }

  const getAccessToken = async()=>{
    var value = await AsyncStorage.getItem("Token");
    alert(JSON.stringify(value));
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getAccessToken();
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
  const Logout =()=>{
    auth()
    .signOut()
    .then(() => {
        navigation.navigate("HomeScreen")
        AsyncStorage.removeItem("Token");
    });
  }
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',width:'100%'}}>
      <Text>Welcome {user.email}</Text>
<ButtonComp title="Log Out" onPress={()=>Logout()}/>

    </View>
  );


}

export default HomePage;