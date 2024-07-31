import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {store} from './src/redux/store'
import {Loading} from './src/components'
import { Provider, useDispatch, useSelector } from 'react-redux';
import {getAllData} from './src/redux/dataSlice';

const AppWrapper = () => {
  return(
    <Provider store={store}>
      <App/>
      </Provider>)
  
}

const App =() => {

  const dispatch = useDispatch()

  const {isLoading, isSaved} = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getAllData());
  }, []);  

  useEffect(() => {
    if (isSaved) {
      dispatch(getAllData());
    }
  }, [isSaved]);  

  if(isLoading){
    return (<Loading/>)
  }

  return (
    <RootNavigation/>
  );
}

export default AppWrapper;