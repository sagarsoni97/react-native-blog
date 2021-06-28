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
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

const App: FC = (props: any) => {

    // All States
    const [items, setItems] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)

    // Get My Posted Ads
    const getDetails = async () => {
        const querySnap = await firestore().collection('blog')
            .where('uid', '==', auth().currentUser?.uid)
            .get()
        const result = querySnap.docs.map((docSnap) => {
            return {
                ...docSnap.data(),
                id: docSnap.id
            }
        })
        setItems(result)
    }

    // Hooks
    useEffect(() => {
        getDetails()
    }, [items])

    // Logout Logic
    const logOut = async () => {
        try {
            auth().signOut()
            props.navigation.navigate("signin")
        } catch (error) {
            console.log(error)
        }
    }

    // Delete Logic
    const handleDelete = async (id: any) => {
        firestore().collection("blog").doc(id).delete().then(() => {
            getDetails()
            showMessage({
                message: 'Your Blog is Deleted Successfully',
                type: 'danger',
                duration: 5000
            });
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    // Render Card
    const renderItem = (item: any) => {
        console.log(item)
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('updateBlog', { item })}>
                    <Card key={moment(item.createdAt.toDate()).calendar()} containerStyle={{ marginBottom: '4%', backgroundColor: '#F4F6F7' }}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                        <Text style={styles.content}>Title : {item.title} </Text>
                        <Text numberOfLines={1} style={styles.content}>Description: {item.body} </Text>
                        <Text numberOfLines={1} style={styles.content}>Posted By: {item.postedBy} </Text>
                        <Text style={styles.content}>Posted At: {moment(item.createdAt.toDate()).calendar()}</Text>
                        <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
                        <Button title="Update" onPress={() => props.navigation.navigate('updateBlog', { item })} />
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Header title="Profile" />
            <Button color="red" onPress={() => logOut()} title="logout" />
            <Text style={{ textAlign: 'center', fontSize: 15 }}>Loggedin with {auth().currentUser?.email}</Text>
            <FlatList
                data={items.reverse()}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => renderItem(item)}
                onRefresh={() => {
                    setLoading(true)
                    getDetails()
                    setLoading(false)
                }}
                refreshing={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({


    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: '5%',
        backgroundColor: '#F4F6F7',
    },

    image: {
        width: '100%',
        height: 200,
        marginTop: '-4%',
        borderRadius: 25
    },

    content: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin: 2
    }

})

export default App