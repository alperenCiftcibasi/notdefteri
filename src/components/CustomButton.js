import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

const CustomButton = ({pressedButtonColor, buttonColor, 
  handleOnPress, buttonText, flexValue, setHeight, setWidth, onTouchOpacity, margin}) => {
    
    return (
        <Pressable
        onPress={() => handleOnPress()}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? pressedButtonColor : buttonColor,
            flex: flexValue,
            height: setHeight,
            width: setWidth,
            opacity: pressed ? onTouchOpacity : null,
            margin: margin,
          },
          styles.button
        ]}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </Pressable>

    );
}

const styles = StyleSheet.create({
    buttonText:{
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        padding: 7,
        justifyContent: 'center',
      },
      button:{
        borderRadius: 5,
      },
    
})

export default CustomButton;
