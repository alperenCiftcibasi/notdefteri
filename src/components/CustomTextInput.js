import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import {useSelector} from 'react-redux';

const CustomTextInput = ({isSecureText, handleOnChangeText, handleValue, setPlaceHolder,
     title, setPlaceHolderColor, setColor, setBorderColor}) => {
    
    const {darkMode} = useSelector(state => state.data)

        const styles = getStyles(darkMode); 
    
    return (
        <View style={styles.inputContainer}>
        <Text style={styles.inputBoxText}>{title}</Text>
        <TextInput 
          style={styles.textInputStyle}
          placeholder={setPlaceHolder}
          onChangeText={handleOnChangeText}
          value={handleValue}
          secureTextEntry={isSecureText}
          placeholderTextColor={setPlaceHolderColor}
          color={setColor}
          borderColor={setBorderColor}
        />
        </View>
  
    );
}

const getStyles =(darkMode) => StyleSheet.create({
    inputBoxText:{
        fontWeight:'bold',
        alignSelf: 'flex-start',
        color: darkMode ? 'white' : 'black',
    },
    inputContainer:{
        width: '80%',
        alignItems: 'center',
        marginBottom: 30
    
    },
    textInputStyle: {
        borderBottomWidth: 1,
        borderRadius: 5,
        width: '100%',
        height: 30,
        textAlign: 'center',
    },    
})

export default CustomTextInput;
