import React from 'react';
import { StyleSheet, View } from 'react-native';
import HomePage from '../screens/HomePage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NewNotePage from '../screens/NewNotePage';
import NoteDetailsPage from '../screens/NoteDetailsPage';

const Stack = createNativeStackNavigator();

const UserStack = () => {
    return (
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
           <Stack.Screen name="Home" component={HomePage}/>
           <Stack.Screen name="NewNote" component={NewNotePage}/>
           <Stack.Screen name="NoteDetails" component={NoteDetailsPage}/>
       </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default UserStack;
