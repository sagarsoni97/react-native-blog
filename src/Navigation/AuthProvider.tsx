import React, { createContext, useState, FC } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});


export const AuthProvider : FC = ({ children }) => {

    const [user, setUser] = useState(null);
    
    return (
     
     <AuthContext.Provider
        value={{
          user,
          setUser,

          // Login Logic
          login: async (email : string, password : string) => {
            if (!email || !password) {
              alert('Please fill all field')
              return
          }
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              alert(e);
            }
          },

          // Register Logic
          register: async (email : string, password : string) => {
            if (!email || !password) {
              alert('Please fill all field')
              return
          }
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              alert(e);
            }
          },

          // Logout Logic
          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              alert(e);
            }
          }
          
        }}
      >
        
        {children}
      </AuthContext.Provider>
    );
  };