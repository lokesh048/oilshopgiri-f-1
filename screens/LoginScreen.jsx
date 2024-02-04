import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';


//const JOKE_API = 'http://http://192.168.0.174/easyinvoiceapi/api/auth/GetUserDetails?UserName=admin1&Password=12345';

var apiresult;

const getRandomJoke = async (userName, passWord) => {
  try {
    const result = await fetch('http://192.168.1.31/easyinvoiceapi/api/auth/GetUserDetails?companyCode=1&userName='+ userName +'&Password=' + passWord,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseData) => {
        apiresult = responseData;
      });

  } catch (error) {
    console.log("Error", error);
   }
}

const window = Dimensions.get('window');
export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false); 
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }; 
 
  
  const handleUserNameInputChange = (text) => {
    setUserName(text);
  };

  const handlePasswordInputChange = (text) => {
    setPassword(text);
  };

  const generateJoke = async () => {
    const randomJokeData = await getRandomJoke(username, password);
    console.log(apiresult.userName);
    if (apiresult.userName !== undefined && apiresult.userName !== 'Fail' ) {

      navigation.navigate('Main1');
      ToastAndroid.show('Login successfully ', ToastAndroid.SHORT);

    }
    else{
      Alert.alert('Wrong Password', 'Enter the correct password', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    }

  
}

  return (
<ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrowIcon}>
         
        </TouchableOpacity> */}
        <Text style={styles.title}>GIRI & CO</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/images/oilcan.jpg')} style={styles.logo} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.form}>
          <Text style={styles.labelText}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter User name"
            onChangeText={handleUserNameInputChange}
            value={username}
          />

          <Text style={styles.labelText}>Password</Text>
          <View>
            <TextInput
              style={styles.passwordInput}
              secureTextEntry={true}
              placeholder="Enter password"
              onChangeText={handlePasswordInputChange}
              value={password}
            />
            {/* Your Eye Icon logic here */}
          </View>

          <TouchableOpacity onPress={generateJoke} style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: 'white',
      padding: window.height * 0.02, // Using relative padding
      borderTopRightRadius: window.height * 0.05, // Using relative border radius
      borderTopLeftRadius: window.height * 0.05,
    },
    title: {
      fontSize: window.width * 0.1, // Using relative font size
      fontWeight: 'bold',
      color: 'green',
      paddingLeft: window.width * 0.25, // Using relative padding
    },
    logoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logo: {
      width: window.width * 0.4, // Using relative width
      height: window.height * 0.4, // Using relative height
    },
    formContainer: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: window.height * 0.05,
      borderTopRightRadius: window.height * 0.05,
      padding: window.width * 0.05, // Using relative padding
      marginTop: window.height * 0.05, // Using relative margin
    },
    form: {
      spaceY: 2,
    },
    labelText: {
      color: '#000000',
      marginLeft: window.width * 0.01, // Using relative margin
      fontWeight: 'bold',
    },
    input: {
      padding: window.width * 0.04, // Using relative padding
      backgroundColor: '#A9A8A1',
      color: '#000000',
      borderRadius: window.width * 0.1, // Using relative border radius
      marginBottom: window.height * 0.02, // Using relative margin
    },
    passwordInput: {
      padding: window.width * 0.04,
      backgroundColor: '#A9A8A1',
      color: '#000000',
      borderRadius: window.width * 0.1,
      marginBottom: window.height * 0.02,
    },
    loginButton: {
      padding: window.width * 0.04,
      backgroundColor: 'yellow',
      borderRadius: window.width * 0.1,
      marginTop: window.height * 0.02,
    },
    loginText: {
      fontSize: window.width * 0.05,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000000',
    },
  });
  
 
