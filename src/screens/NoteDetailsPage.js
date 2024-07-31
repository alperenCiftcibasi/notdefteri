import React, {useState} from 'react';
import { StyleSheet, View , Text, Pressable, Image, TextInput, Button, 
    Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setBaslik, setContent, saveData, updateData , setId, 
    setErrorMessage, deleteData, pinData, setIsPinned, unpinData} from '../redux/dataSlice';
import {CustomModal} from '../components/'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const NoteDetailsPage = ({navigation, route}) => {


    const dispatch = useDispatch()

    const {data, allData, isLoading, isSaved,
         baslik, content, id, errorMessage, isPinned,
         darkMode} = useSelector(state => state.data)

         const styles = getStyles(darkMode); 
         
    const { noteId, noteBaslik,noteContent, notePinStatus } = route.params;

    return (
        <View style= {styles.container}>

            <View style= {styles.header}>

                <Pressable 
                style={styles.geridon}
                onPress={()=>{navigation.goBack()}}
                >
                    <Image 
                    source={require('../../assets/prev1.png')}
                    style= {styles.geridonIcon}
                    />
                </Pressable>

                {!notePinStatus && <Pressable 
                style={styles.pinContainer}
                onPress={()=>{dispatch(setId(noteId)), 
                    dispatch(pinData({id: noteId}))}}>
                    <AntDesign name="pushpin" size={37} 
                    color= {darkMode ? "white" :"black" } />
                </Pressable>}
                {notePinStatus && <Pressable 
                style={styles.pinContainer}
                onPress={()=>{dispatch(setId(noteId)), 
                    dispatch(unpinData({id: noteId}))}}>
                    <AntDesign name="pushpino" size={37} 
                    color= {darkMode ? "white" :"black" } />
                </Pressable>}

                <Pressable 
                style={styles.silContainer}
                onPress={()=>{dispatch(setId(noteId)), 
                    dispatch(deleteData({id: noteId}))}}>
                    <MaterialCommunityIcons name="delete" size={37} 
                    color= {darkMode ? "white" :"black" } />
                </Pressable>

                <Pressable 
                style={styles.kaydetContainer}
                onPress={()=>{dispatch(setId(noteId)), 
                    dispatch(updateData({baslik, content, id: noteId}))}}>
                    <Text style={{color: 'rgb(227, 199, 100)', fontSize: 35,}}>
                    Kaydet
                    </Text>
                </Pressable>

                <View style= {styles.baslikInputContainer}>
                    <TextInput
                    onChangeText={(baslik)=>{dispatch(setBaslik(baslik))}}
                    placeholder="Başlık Giriniz"
                    placeholderTextColor='gray'
                    
                    >{noteBaslik}
                    </TextInput>
                </View>

            </View>

            <View style= {styles.body}>
            <TextInput 
            placeholder="Notunuzu Giriniz"
            placeholderTextColor = 'gray'
            multiline
            onChangeText={(content)=>{dispatch(setContent(content))}}
            style= {styles.noteContent}
            >{noteContent}
            </TextInput> 
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
        backgroundColor: darkMode ? 'lightgray' : null,
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
        backgroundColor: darkMode ? 'lightgray' : null,
    },
    noteContent:{
        height: '100%',
        width: '100%',
        padding: 5,
        textAlign: 'left',
        textAlignVertical: 'top',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        borderRadius: 4,
        alignItems: 'center',
      },
      modalText: {
        marginBottom: 12,
        fontSize: 18,
      },
      silContainer: {
        position: 'absolute', 
        right: 135, 
        top: 7,
    },
    pinContainer: {
        position: 'absolute', 
        right: 190, 
        top: 7,
    },
})

export default NoteDetailsPage;

