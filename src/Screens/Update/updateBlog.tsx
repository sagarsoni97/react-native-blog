import React, { FC, useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    TouchableOpacity,
    Alert,
    Button,
    TouchableWithoutFeedback
} from 'react-native';

// Reuseable Component
import { CustomInput, CustomButton, Header } from '../../Component/Index'

// Firebase Related Import
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Third Party Import
import { Card } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';

const App: FC = (props: any) => {

    // Props Distructure
    const item = (props.route.params.item)
    const id: string = (item.id)

    // State
    const [title, setTitle] = useState<string>(item.title)
    const [body, setBody] = useState<string>(item.body)
    const [name, setName] = useState<string>(item.name)
    const [postedBy] = useState<string>(item.postedBy)

    // Handle Update Logic
    function handleUpdate(id: string | undefined) {
        try {
            var value = firestore().collection("blog").doc(id)
            value.update({
                title: title,
                body: body,
                name: name,
                postedBy: postedBy
            })
            showMessage({
                message: 'Your Blog is Updated Successfully',
                type: 'success',
                duration: 5000
            })
            props.navigation.navigate("Profile")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <CustomInput
                value={title}
                placeholder="Enter Title"
                onChange={setTitle}
                autoCapitalize="none"
                autoCompleteType="off"
                numberOfLines={1}
            />

            <CustomInput
                value={body}
                placeholder="Enter Description"
                onChange={setBody}
                autoCapitalize="none"
                autoCompleteType="off"
                numberOfLines={1}
            />

            <CustomInput
                value={name}
                placeholder="Enter Name"
                onChange={setName}
                autoCapitalize="none"
                autoCompleteType="off"
                numberOfLines={1}
            />

            <CustomButton
                title="Update"
                onPress={() => handleUpdate(id)}
                backgroundColor="red"
            />
        </View>
    )
}

export default App