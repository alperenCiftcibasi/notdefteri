import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, addDoc, getDocs, getDoc, doc, deleteDoc, updateDoc, 
    setDoc } from 'firebase/firestore';
import { db } from './../../firebaseConfig';
import firestore from 'firebase/firestore';

// firebasedeki tüm verileri çekmeyi sağlar
export const getAllData = createAsyncThunk("data/getAllData", async()=>{
    const allData=[]
    try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        querySnapshot.forEach((doc) => {
          allData.push({ id: doc.id, ...doc.data() });
       });
        await console.log(allData);
        return allData;
    } catch (error) {
        console.log(error)
        throw error
      }
 })

//update data
export const updateData = createAsyncThunk("data/updateData", async({id, content, baslik}, 
    { dispatch })=>{
    try {
        const docRef = doc(db, "notes", id); // Belgeye referans

        if (content == "" || baslik == "") {
            const uyari = "Başlık ve notu güncellediğinizden emin olun. Değişikliğiniz kaydedilmedi";
            dispatch(setErrorMessage(uyari));
            return;                  
        }

        await updateDoc(docRef, {
          content: content,
          header: baslik,
        });

        console.log('Document successfully updated!');
        return {id, content, baslik};
    } catch (error) {
        console.error('Error updating document: ', error);
    }
})

// notu siler
export const deleteData = createAsyncThunk("data/deleteData", async({id})=>{
    try {
        const noteRef = doc(db, 'notes', id);
        await deleteDoc(noteRef);
        return id;

    } catch (error) {
        console.error("error deleting note: ", error);
    }
})

//kullanıcının girdiği veriyi firebase'e kaydeder
export const saveData = createAsyncThunk("data/saveData", async({baslik, content})=>{
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            header: baslik,
            content: content,
            pinStatus: false,
          });
          console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error saving data: ", e);
      }

})

export const pinData = createAsyncThunk("data/pinData", async({id})=>{
    try {
        const docRef = doc(db, "notes", id); // Belgeye referans

        await updateDoc(docRef, {
            pinStatus: true,
          });  

        console.log("pinned! id: ", id);
    } catch (error) {
        console.log("error occurred while pinned data: ", error);
    }
})

export const unpinData = createAsyncThunk("data/unpinData", async({id})=>{
    try {
        const docRef = doc(db, "notes", id); // Belgeye referans

        await updateDoc(docRef, {
            pinStatus: false,
          });  

        console.log("unpinned! id: ", id);
    } catch (error) {
        console.log("error occurred while pinned data: ", error);
    }
})

const initialState ={
    data: [],
    allData: [],
    isLoading: false,
    isSaved: false,
    error: null,
    baslik: "",
    content: "",
    id: "",
    errorMessage: "",
    isPinned: false,
    darkMode: false,
}
export const dataSlice = createSlice({
    name:'data',
    initialState,
    reducers:{     
        setErrorMessage(state, action) {
            state.errorMessage = action.payload;
          },      
        clearErrorMessage(state) {
            state.errorMessage = null;
        },
        setUserInput: (state,action)=>{
            state.userInput = action.payload;
        },
        setBaslik: (state, action)=>{
            state.baslik = action.payload;
        },
        setContent: (state,action)=> {
            state.content = action.payload;
        },
        setId: (state, action)=> {
            state.id = action.payload;
        },
        setIsPinned: (state, action) => {
            state.isPinned = action.payload;
        },
        setDarkMode: (state, action) => {
            state.darkMode = action.payload;
        }

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(getAllData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSaved = !state.isSaved;
                state.allData = action.payload;
            })
            .addCase(getAllData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(saveData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(saveData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSaved = !state.isSaved;
                state.baslik = "";
                state.content = "";
            })
            .addCase(saveData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(updateData.fulfilled, (state)=>{
                state.isLoading = false;
                state.isSaved = !state.isSaved;
                state.baslik = "";
                state.content = "";
                state.id = "";
            })
            .addCase(updateData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(deleteData.fulfilled, (state)=>{
                state.isLoading = false;
                state.isSaved = !state.isSaved;
            })
            .addCase(deleteData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(pinData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(pinData.fulfilled, (state, action)=>{
                state.isLoading = false;
                state.isSaved = !state.isSaved;
            })            
            .addCase(pinData.rejected, (state, action)=>{
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(unpinData.pending, (state)=>{
                state.isLoading = true;
            })
            .addCase(unpinData.fulfilled, (state, action)=>{
                state.isLoading = true;
                state.isSaved = !state.isSaved;
            })
            .addCase(unpinData.rejected, (state, action)=>{
                state.isLoading = true;
                state.error = action.payload;
            })
    }
})  

export const {setUserInput, setBaslik, setContent, setId, setErrorMessage, 
    clearErrorMessage, setIsPinned, setDarkMode} = dataSlice.actions;
export default dataSlice.reducer;