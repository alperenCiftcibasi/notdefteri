import React, {useState} from 'react';
import { StyleSheet, View , Text, Pressable, Image, TextInput} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setBaslik, setContent, saveData} from '../redux/dataSlice';

const NewNotePage = ({navigation}) => {

    const dispatch = useDispatch()

    const {data, allData, isLoading, isSaved,
         baslik, content, darkMode} = useSelector(state => state.data)

         const styles = getStyles(darkMode)

         console.log(baslik, content);

    return (
        <View style= {styles.container}>

            <View style= {styles.header}>

                <Pressable 
                style={styles.geridon}
                onPress={()=>navigation.goBack()}
                >
                    <Image 
                    source={require('../../assets/prev1.png')}
                    style= {styles.geridonIcon}
                    />
                </Pressable>

                <Pressable 
                style={styles.kaydetContainer}
                onPress={()=>{dispatch(saveData({baslik, content}))}}>
                    <Text style={{color: 'rgb(227, 199, 100)', fontSize: 35,}}>
                    Kaydet
                    </Text>
                </Pressable>

                <View style= {styles.baslikInputContainer}>
                    <TextInput
                    onChangeText={(baslik)=>{dispatch(setBaslik(baslik))}}
                    placeholder="Başlık Giriniz"
                    >
                    
                    </TextInput>
                </View>

            </View>

            <View style= {styles.body}>
            <TextInput 
            placeholder="Notunuzu Giriniz"
            multiline
            onChangeText={(content)=>{dispatch(setContent(content))}}
            style= {styles.noteContent}
            ></TextInput> 
            </View>

            <View style = {styles.bottom}>

            </View>

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
        flex: 2.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 8,
        width: '90%',
        height:'100%',        
        borderWidth:1,
        borderRadius: 5,
        backgroundColor: 'lightgray'
    },
    bottom: {
        flex:0.5,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: '',
    },
    kaydetContainer: {
        position: 'absolute', 
        right: 8, 
        top: 0,
        
    },
    geridon: {
        position: 'absolute',
        left: 0,
        top: 0,
        
    },
    geridonIcon: {
        width: 50,
        height: 50,
        tintColor: 'rgb(227, 199, 100)',
    },
    baslikInputContainer: {
        borderWidth:1,
        position: 'absolute',
        bottom: 2,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 5,
        width: '90%',
        backgroundColor: 'lightgray',
    },
    noteContent:{
        height: '100%',
        width: '100%',
        padding: 5,
        textAlign: 'left',
        textAlignVertical: 'top',
    }
})

export default NewNotePage;
