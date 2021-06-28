import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ImageBackground,
    FlatList,
    TouchableWithoutFeedback
} from 'react-native';

// Reuseable Component
import { CustomInput, CustomButton, Header } from '../../Component/Index'

// Firebase Related Import
import firestore from '@react-native-firebase/firestore';

// Third Party Import
import { Card } from 'react-native-elements'
import moment from 'moment';

const App: React.FC = (props : any) =>{

     // All STates
     const [items, setItems] = useState<any>([])
     const [loading, setLoading] = useState<boolean>(false)


     // Fetch Details Function
     const getDetails = async () => {
         const querySnap = await firestore().collection('blog').get()
         const result = querySnap.docs.map(docSnap => docSnap.data())
         setItems(result)
     }
 
     // Hooks
     useEffect(() => {
         getDetails()
     }, [items])

     const renderItem = (item : any) => {
        console.log(item)
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('BlogDetails', { item })}>
                    <Card key={item.id} containerStyle={{ marginBottom: '4%', backgroundColor: '#F4F6F7' }}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                        <Text style={styles.content}>Title : {item.title} </Text>
                        <Text numberOfLines={1} style={styles.content}>Description: {item.body} </Text>
                        <Text numberOfLines={1} style={styles.content}>Posted By: {item.postedBy} </Text>
                        {/* <Text style={styles.content}>Posted At: {moment(item.createdAt.toDate()).calendar()}</Text> */}
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
                <Header title="Blogs" />
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
     
    },

    content: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin: 2
    }

})


export default App