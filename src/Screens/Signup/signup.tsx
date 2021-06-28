import React, { FC, useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

// Reuseable Component
import { CustomInput, CustomButton, Header } from '../../Component/Index'

// Firebase Related Import
import auth from '@react-native-firebase/auth';

const App : FC = (props:any) => {
    
     // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Signin Function
    const signup = async () => {
        if (!email || !password) {
            Alert.alert('Please fill all field')
            return
        }
        try {
            await auth().createUserWithEmailAndPassword(email, password)
            props.navigation.navigate("Blog")
        } catch (error) {
            Alert.alert(error)
        }
    }

    return (
        <View style={{ flex: 1 }}>

            <Header title="Please Signup Here" />

            <CustomInput
                value={email}
                placeholder="Enter Email"
                onChange={setEmail}
                autoCapitalize="none"
                autoCompleteType="off"
                numberOfLines={1}
            />

            <CustomInput
                value={password}
                placeholder="Enter Password"
                onChange={setPassword}
                autoCapitalize="none"
                autoCompleteType="off"
                numberOfLines={1}
            />

            <CustomButton
                title="Sign Up"
                onPress={() => signup()}
                backgroundColor="blue"
            />

        <TouchableOpacity onPress={()=> props.navigation.navigate("signin")} style={{ alignSelf: 'center', marginTop: "5%" }}>
                <Text>Already Have Account Login Here</Text>
            </TouchableOpacity>
        </View>
    )
}

export default App;