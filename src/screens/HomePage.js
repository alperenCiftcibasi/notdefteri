import React, {useState, useMemo} from 'react';
import { StyleSheet, View,Text, StatusBar, Image, Pressable, TextInput ,
    KeyboardAvoidingView, FlatList} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../redux/userSlice';
import {getAllData,setErrorMessage, clearErrorMessage, 
    setDarkMode} from '../redux/dataSlice';
import {CustomButton} from '../components';
import { SimpleLineIcons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';

const HomePage = ({navigation}) => {

    const [searchInput, setSearchInput] = useState('');

    const dispatch = useDispatch()

    const {data, allData, isLoading, isSaved, errorMessage, 
        darkMode} = useSelector(state => state.data)

        const styles = getStyles(darkMode); 

    const filteredNotes = useMemo(()=>{
        return allData.filter(note => 
            note.header.toLowerCase().includes(searchInput.toLowerCase())
        )
    }, [searchInput, allData])

    const pinnedNotes = filteredNotes.filter(note => note.pinStatus === true);
    const normalNotes = filteredNotes.filter(note => note.pinStatus === false);

    const handleClearError = () => {
        console.log('Clearing error message');
        dispatch(clearErrorMessage());
      };
    
    const renderItem = ({item}) => {
        return (
            <Pressable 
            style={styles.flatListElementContainer}
            onPress={()=> {
                navigation.navigate('NoteDetails',{ noteId: item.id, 
                noteBaslik: item.header, noteContent: item.content, 
                notePinStatus: item.pinStatus })          
                }}
                >

                <Text style={{marginLeft: 5, fontWeight: 'bold'}}>
                    {item.header}
                    </Text>

            </Pressable>
        )
    }

    return (
        <View style= {styles.container}>
            <StatusBar/>
            <View style={styles.header}>

            {errorMessage && errorMessage.trim().length > 0 && (
                    <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    <Pressable 
                    style={{borderWidth: 0.7, width: 50, borderRadius: 5, 
                        backgroundColor: 'lightblue'}}
                    onPress={handleClearError}>
                        <Text style={{textAlign: 'center'}}>Kapat</Text>
                        </Pressable>
                    </View>
                )}

                <Pressable 
                style={styles.createNewNote}
                onPress={()=>navigation.navigate('NewNote')}>
                <SimpleLineIcons name="note" size={35} color={'rgb(227, 199, 100)'}/>
                </Pressable>

                {!darkMode && <Pressable 
                style={styles.modeChange}
                onPress={()=>{dispatch(setDarkMode(true))}}
                >
                <MaterialIcons name="nightlight" size={40} color="gray" />
                </Pressable>}

                {darkMode && <Pressable 
                style={[{marginTop: 2},styles.modeChange]}
                onPress={()=>{dispatch(setDarkMode(false))}}
                >
                <Feather name="sun" size={40} color="white" />
                </Pressable>}

                <Pressable 
                style={styles.logout}
                onPress={()=>dispatch(logOut())}>
                <MaterialIcons name="logout" size={40} color={'rgb(227, 199, 100)'} />
                </Pressable>

                <View style= {{position: 'absolute', bottom: 0, height: 32,
                    width: '60%', alignItems: 'center', flexDirection: 'row',
                }}>
                <TextInput 
                    style={styles.searchBar}
                    placeholder='Notlar içinde ara'
                    placeholderTextColor= {darkMode ? 'white' : null}
                    value= {searchInput}
                    onChangeText={setSearchInput}
                />

                </View>
                
            </View>

            <View style={styles.body}>
                <View style= {styles.flatlistPinnedContainer}>
                <Text style={{fontWeight: 'bold', 
                    color: darkMode ? 'white' : null,}}>Sabitlenmiş Notlar</Text>
                    <FlatList
                    style= {styles.flatlistPinned}
                    data={pinnedNotes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    />
                </View>

                <View style= {styles.flatlistNormalContainer}>
                <Text style={{fontWeight: 'bold', 
                    color: darkMode ? 'white' : null,}}>Notlar</Text>
                <FlatList 
                    style={styles.flatlistNormal}
                    data={normalNotes}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                </View>

            </View>

            <View style={styles.bottom}>
            </View>
        </View>
    );
}

const getStyles =(darkMode)=> StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: darkMode ? 'black' : 'white',
    },
    header: {
        flex: 0.75,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        flex: 3.2,
        width: '100%',
        height:'100%',        
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        flex:0.1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: '',
    },
    logout: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    searchBar:{
        borderWidth:0.6,
        width: '60%',
        textAlign: 'center',
        flex:1,
        height: '100%',
        borderRadius: 4,
        borderColor: darkMode ? 'white' : null,
    },
    flatlistNormal:{
        width: '90%',
        borderWidth:0.2,
        borderRadius: 2,
        backgroundColor: 'rgb(232, 232, 232)'
    },
    flatlistNormalContainer: {
        flex: 4,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    flatlistPinned:{
        width: '90%',
        borderWidth:0.2,
        borderRadius: 2,
        backgroundColor: 'rgb(232, 232, 232)',
    },
    flatlistPinnedContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    flatListElementContainer: {
        borderWidth:0.5,
        borderRadius: 10,
        height: 30,
        alignItems: 'center',
        flex:1,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        marginVertical: 1,
        marginHorizontal: 7,
    },
    itemContainer: {
        marginLeft: 10,
        borderWidth:1,
    },
    createNewNote: {
        position: 'absolute',
        top: 2,
        left: 5,
    },
    errorContainer: {
        backgroundColor: 'pink',
        borderRadius: 30,
        paddingHorizontal: 10,
        alignItems: 'center',
        width: '76%',
        position: 'absolute',
        top: 0,
    },
    errorText: {
        color: '#721c24',
        textAlign: 'center'
    },    
    searchButton: {
        flex:1,
    },
    modeChange: {
        position: 'absolute',
        top:0,
        right: 55,
    },
})

export default HomePage;
