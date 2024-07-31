import React, {useState} from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import {register} from '../redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {CustomTextInput, CustomButton, Loading} from '../components/'

const SignupPage = ({navigation}) => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(name, email, password);

    const dispatch = useDispatch();

    const{isLoading} = useSelector((state)=>state.user)
    const {darkMode} = useSelector((state)=> state.data)

    const styles = getStyles(darkMode)

    const handleRegister = () =>{
        dispatch(register({email, password}))
    }

    if(isLoading){
        return <Loading/>;
    }

    return (
        <View style={styles.container}>

            <View style={styles.title}>
            <Text style={styles.signUp}>Kaydol</Text>
            </View>

            <View style={styles.textInputContainer}>

                <CustomTextInput
                title="Email"
                setPlaceHolder="ornek@ornek.com"
                handleOnChangeText={setEmail}
                setValue={email}
                isSecureText={false}  
                setPlaceHolderColor = {'gray'}
                setColor={darkMode ? 'white' : 'black'}
                setBorderColor = {darkMode ? 'white' : null}
                />

                <CustomTextInput
                title="Password"
                setPlaceHolder="en az 6 karakter"
                handleOnChangeText={setPassword}
                setValue={password}
                isSecureText={true} 
                setPlaceHolderColor = {'gray'}
                setColor={darkMode ? 'white' : 'black'}
                setBorderColor = {darkMode ? 'white' : null}
                />
            </View>
            <View style={[{marginTop: 20},styles.signUpOptionsContainer]}>
                <CustomButton
                    setWidth='60%'
                    pressedButtonColor="lightblue"
                    buttonColor="blue"
                    handleOnPress={handleRegister}
                    buttonText="Kaydol"
                />

                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={{fontWeight: 'bold', marginBottom:10,
                        color: darkMode ? 'white' : 'black',
                    }}>
                        Zaten hesabınız var mı? Giriş Yap
                        </Text>
                </Pressable>
                
            </View>
        </View>
    );
}

const getStyles = (darkMode ) => StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: darkMode ? 'black' : 'white',
    },
    signUp: {
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: 30,
        color: darkMode ? 'white' : 'black',
      },    
    textInputContainer:{
        width: '100%',
        alignItems: 'center',
        flex: 3,
        justifyContent:'center'
    },
    title:{
        flex:2,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
    },
    signUpOptionsContainer:{
        flex: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})

export default SignupPage;
