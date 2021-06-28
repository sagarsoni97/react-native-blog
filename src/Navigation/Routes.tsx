import React, { useContext, useState, useEffect, FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from './AuthStack';
import {ValidStack} from './ValidStack';
import { AuthContext } from './AuthProvider';
import {
  View, Text, Dimensions, StyleSheet, TextInput, TouchableOpacity,
  Keyboard, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';

const Routes : FC = ()=>{

    const { user, setUser } = useContext<any>(AuthContext);

    // const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState<boolean>(true);

    // Handle user state changes
    function onAuthStateChanged(user:any) {
      setUser(user);
      if (initializing) setInitializing(false);
    }

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

  
    return (
      <NavigationContainer>
        {user ? <ValidStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }

  export default Routes