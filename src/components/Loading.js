import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Pressable} from 'react-native';

const Loading = ({changeIsLoading}) => {
    
 //   <Pressable 
 //  onPress={()=> changeIsLoading()}
 //   style={[{},styles.exit]}>
 //       <Text style={styles.exitText}>X</Text>
 //       </Pressable>
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large'/>
            <Text style={styles.loadingText}>Loading..</Text>
        </View>

        
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: 'lightgray',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontWeight: 'bold',
        fontSize: 26
    },
    exit: {
        backgroundColor: 'black',
        height: 50,
        width: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        top: 35,
        right: 20,
        position: 'absolute',
        },
    exitText: {
        color: 'white',
    },
})

export default Loading;
