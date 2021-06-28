import React, { useEffect, useState, FC } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

// Reuseable Component
import { CustomInput, CustomButton, Header } from '../../Component/Index'

// Firebase Related Import
import auth from '@react-native-firebase/auth';

const App: FC = (props: any) => {

    // State
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // Signin Function
    const signin = async () => {
        if (!email || !password) {
            Alert.alert('Please fill all field')
            return
        }
        try {
            await auth().signInWithEmailAndPassword(email, password)
            props.navigation.navigate("Blog")
        } catch (error) {
            Alert.alert(error)
        }
    }

    return (
        <View>
            <Header title="Please Signin Here" />

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
                title="Sign In"
                onPress={() => signin()}
                backgroundColor="red"
            />

            <TouchableOpacity onPress={() => props.navigation.navigate("signup")} style={{ alignSelf: 'center', marginTop: "5%" }}>
                <Text>Don't Have Account Singup Here</Text>
            </TouchableOpacity>
        </View>
    )
}

export default App