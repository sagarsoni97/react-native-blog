import React, { FC, useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import auth from '@react-native-firebase/auth'

import AuthStack from './AuthStack';
import {ValidStack} from './ValidStack';

const MainStack : FC = () => {

    const [user, setUser] = useState<any>(null);

    const bootstrap = () => {
        auth().onAuthStateChanged(_user => {
            if(_user){
                setUser(_user)
            }
        })
    }

    useEffect(() => {
        bootstrap()
    }, [])


return(
    <NavigationContainer>
          {user !== null ? <ValidStack /> : <AuthStack />}
    </NavigationContainer>
)
}

export default MainStack