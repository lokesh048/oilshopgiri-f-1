import { useNavigation } from '@react-navigation/native';
// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



  import React from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
const { width, height } = Dimensions.get('window');
  function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.mainContainer}>
            <Text style={styles.title}>GIRI & CO</Text>
            <View style={styles.imageContainer}>
              <Image
                source={require('../assetimage/oilcan.jpg')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      );
    };
    
    export default WelcomeScreen;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
      },
      mainContainer: {
        flexGrow: 1,
        justifyContent: 'space-around',
        paddingVertical: height * 0.1,
        paddingHorizontal: width * 0.05,
      },
      title: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: height * 0.05,
        textAlign: 'center',
      },
      imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      image: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
      },
      buttonContainer: {
        alignItems: 'center',
        marginTop: height * 0.1,
      },
      button: {
        paddingVertical: height * 0.03,
        paddingHorizontal: width * 0.05,
        backgroundColor: 'yellow',
        borderRadius: 12,
        width: '80%',
      },
      buttonText: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        color: '#000000',
        textAlign: 'center',
      },
    });

