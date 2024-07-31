import React from 'react';
import { StyleSheet, View } from 'react-native';
import AuthStack from './AuthStack';
import UserStack from './UserStack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import app from '../../firebaseConfig';


const RootNavigation = () => {

    const {isAuth} = useSelector((state)=>state.user)

    return (
        <NavigationContainer>
            {
                !isAuth ? <AuthStack/> : <UserStack/> 
            }

        </NavigationContainer>
    );
}

const styles = StyleSheet.create({})

export default RootNavigation;
