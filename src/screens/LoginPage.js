import React, {useState,useEffect} from 'react';
import { StyleSheet, View, Text , TextInput, Image} from 'react-native';
import {CustomTextInput,CustomButton, Loading} from '../components/';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setPassword, setIsLoading, login, autoLogin } from '../redux/userSlice';

const LoginPage = ({navigation}) => {

    const{email, password, isLoading, error} = useSelector((state)=> state.user)
    const {darkMode} = useSelector((state) => state.data)
      // userslice icerisindeki reducer yapılarını kullanma ve veri gönderme
  const dispatch = useDispatch()

  const styles = getStyles(darkMode)

    return (
        <View style={styles.container}>
            <View style= {styles.header}>

                <Text style={styles.welcome}>Hoşgeldiniz</Text>
            </View>

            <View style={styles.body}>
                <CustomTextInput
                    style={{}}
                    setPlaceHolder= "ornek@ornek.com"
                    title= "Email"
                    handleValue={email}
                    handleOnChangeText={(text)=> dispatch(setEmail(text))}
                    setPlaceHolderColor= {"gray"}
                    setColor= {darkMode ? 'white' : 'black'}
                    setBorderColor = {darkMode ? 'white' : null}
                />
                <CustomTextInput
                    title= "Şifre"
                    isSecureText= {true}
                    handleOnChangeText={(text)=> dispatch(setPassword(text))}
                    handleValue={password}
                    setPlaceHolder= {"en az 6 karakter"}
                    setPlaceHolderColor= {"gray"}
                    setColor= {darkMode ? 'white' : 'black'}
                    setBorderColor = {darkMode ? 'white' : null}
                />
            </View>

            <View style= {styles.bottom}>
                <CustomButton
                buttonColor= 'blue'
                pressedButtonColor='lightblue'
                buttonText='Giriş Yap'
                setHeight={35}
                setWidth={120}
                margin={30}
                handleOnPress={() => dispatch(login({email, password}))}
                />
                <CustomButton
                buttonColor='gray'
                pressedButtonColor='lightgray'
                buttonText='Kaydol'
                setHeight={35}
                setWidth={80}
                handleOnPress= {() => navigation.navigate("SignUp")}
                />
            </View>
                {isLoading 
                ? <Loading 
                changeIsLoading={()=>dispatch(setIsLoading(false))}/> 
                : null}
        </View>
    );
}

const getStyles = (darkMode ) => StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: darkMode ? 'black' : 'white',
    },
    header: {
        flex: 1.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 2.5,
        width: '100%',
        height:'100%',        
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex:2.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: '',
    },
    notepadIcon: {
        width: 100,
        height: 100,
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 24,
        position: 'absolute',
        bottom: 0,
        color: darkMode ? 'white' : 'black',
    },
})

export default LoginPage;
