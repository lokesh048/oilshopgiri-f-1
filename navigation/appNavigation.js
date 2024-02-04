import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import Screen5 from '../screens/Screen5';
import MainScreen1 from '../screens/mainscreen1';
import MainScreen2 from '../screens/mainscreen2';
import screen3 from '../screens/screen3';
const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
         <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
         <Stack.Screen name="Main1" options={{ headerShown: false }} component={MainScreen1} />
        <Stack.Screen name="Main2" options={{ headerShown: false }} component={MainScreen2} />
        <Stack.Screen name="screen3" options={{ headerShown: false }} component={screen3} />
       <Stack.Screen name="Screen5" options={{ headerShown: false }} component={Screen5} />   
      </Stack.Navigator>
    </NavigationContainer>
  )
}