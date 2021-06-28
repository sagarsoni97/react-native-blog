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
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';

// Reuseable Component
import { CustomInput, CustomButton, Header } from '../../Component/Index'

// Firebase Related Import
import auth from '@react-native-firebase/auth';

// Third Party Import
import { Card } from 'react-native-elements';
import moment from 'moment';

const App: FC = (props: any) => {

    const item = (props.route.params.item)

    return (
        <ScrollView>
            <View style={{ flex: 1 }}>
                <Header title="Blog Details" />
                <TouchableWithoutFeedback onPress={() => props.navigation.navigate('BlogDetails', { item })}>
                    <Card containerStyle={{ marginBottom: '4%', backgroundColor: '#F4F6F7' }}>
                        <Image style={styles.image} source={{ uri: item.image }} />
                        <Text style={styles.title}>Title : {item.title} </Text>
                        <Text style={styles.content}>Description: {item.body} </Text>
                        <Text style={styles.content}>Posted By: {item.postedBy} </Text>
                        <Text style={styles.content}>Posted At: {moment(item.createdAt.toDate()).calendar()}</Text>
                    </Card>
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
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
        marginTop: '-4%'
    },

    content: {
        fontSize: 18,
        fontFamily: 'Josefin Sans',
        margin: 2,
        marginTop: 5
    },

    title: {
        fontSize: 25,
        color: 'red'
    }
})

export default App