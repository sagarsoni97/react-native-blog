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
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator
} from 'react-native';

// Reuseable Component
import { CustomInput, CustomButton, Header } from '../../Component/Index'


// Firebase Related Import
import auth from '@react-native-firebase/auth';
import { serverTimestamp } from '../../Constants/firebase'
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// Third Party Import
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { showMessage } from "react-native-flash-message";

const App: FC = (props: any) => {

    // State
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [image, setImage] = useState<any>(null)
    const [progress, setProgress] = useState<boolean>(false)

    // Upload Image 
    const UploadImage = () => {

        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 400,
            compressImageQuality: 1,
            cropping: true

        }).then(fileobj => {

            setProgress(true)
            var uploadTask = storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.path)
            uploadTask.on('state_changed',
                (snapshot: any) => {
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                (error: any) => {
                    alert(error)
                },
                () => {

                    uploadTask.snapshot?.ref.getDownloadURL()
                        .then((downloadURL) => {
                            setImage(downloadURL)
                            setProgress(false)
                        });
                }
            );
        })
    }

    // Post Data in Firebase
    const PostData = async () => {
        if (!title || !body || !name) {
            alert('Please fill all field')
            return
        }
        try {
            await firestore().collection('blog').add({
                title,
                body,
                image,
                name,
                postedBy: auth().currentUser?.email,
                uid: auth().currentUser?.uid,
                createdAt: serverTimestamp()
            })
            Keyboard.dismiss();
            setTitle("")
            setBody("")
            setName("")
            showMessage({
                message: 'Congratulations !! Your Blog is Posted Refresh for view your Blog',
                type: 'success',
                duration: 5000
            });
            props.navigation.navigate("Blog")
        } catch (error) {
            alert(error)
        }
    }

    return (

        <ScrollView style={{ height: '100%' }}>
            <KeyboardAvoidingView>
                <Header title="Post Blog" />
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
                    numberOfLines={10}
                />

                <CustomInput
                    value={name}
                    placeholder="Enter Your Name"
                    onChange={setName}
                    autoCapitalize="none"
                    autoCompleteType="off"
                    numberOfLines={1}
                />

                {/* <CustomButton
                title="Upload Image"
                onPress={() => UploadImage()}
                backgroundColor="blue"
            /> */}

                <TouchableOpacity onPress={() => UploadImage()} style={styles.btn}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', flex: 1 }}>
                        {
                            progress ? (
                                <ActivityIndicator
                                    size={28}
                                    color={"black"}
                                />
                            ) : (
                                <Text style={styles.btnText}>Upload Image</Text>
                            )
                        }
                        <FontAwesome5 style={{ alignSelf: 'center', padding: '2%' }} name={'camera'} size={25} />
                    </View>
                </TouchableOpacity>

                <CustomButton
                    title="Post Blog"
                    onPress={() => PostData()}
                    backgroundColor="red"
                />
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignSelf: 'center'
    },

    input: {
        borderWidth: 1,
        width: '95%',
        marginTop: '5%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingLeft: 20,
        alignSelf: 'center'
    },

    btn: {
        width: '70%',
        height: 50,
        backgroundColor: '#51FF00',
        borderRadius: 20,
        marginTop: '5%',
        alignSelf: 'center'
    },

    btnText: {
        fontSize: 15,
        textAlign: 'center',
        padding: 10
    }
})

export default App