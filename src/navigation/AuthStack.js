import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/LoginPage';
import SignupPage from '../screens/SignupPage';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator 
        initialRouteName='Login'
        screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginPage}/>
            <Stack.Screen name="SignUp" component={SignupPage}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default AuthStack;
