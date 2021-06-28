import React,{useState, FC} from 'react'

// React Native Navigation Helper Library
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

// Screen Import 

import {Signin, Signup} from '../Screens/index'

const Stack = createStackNavigator();

const AuthStack : React.FC = () => {

  return (
   
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="signin" component={Signin} />
      </Stack.Navigator>
     
  )
}

export default AuthStack