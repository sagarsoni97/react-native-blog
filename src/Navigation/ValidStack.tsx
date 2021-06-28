import React, { useState, FC } from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import {Blog, Profile, PostBlog, BlogDetails, updateBlog} from '../Screens/index'
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Vstack = createStackNavigator();

export const VisitStack : FC = () => {
    return (
      <Vstack.Navigator>
        <Vstack.Screen name="Blog" component={Blog}  options={{ headerShown: false }}/>
        <Vstack.Screen name="BlogDetails" component={BlogDetails}  options={{ headerShown: false }}/>
        <Vstack.Screen name="updateBlog" component={updateBlog}  options={{ headerShown: false }}/>
      </Vstack.Navigator>
    )
  }

  const ValidStack : FC =()=> {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Blog" component={VisitStack} options={{
          tabBarLabel: 'Blog',
          tabBarIcon: ({ color, size }) => (
            <Icon name="book-reader" color={color} size={size} />
          ),
        }} />
  
        <Tab.Screen name="PostBlog" component={PostBlog} options={{
          tabBarLabel: 'PostBlog',
          tabBarIcon: ({ color, size }) => (
            <Icon name="plus" color={color} size={size} />
          ),
        }} />
  
        <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-alt" color={color} size={size} />
          ),
        }} />
  
      </Tab.Navigator>
    
    );
  }
  
  export { ValidStack };