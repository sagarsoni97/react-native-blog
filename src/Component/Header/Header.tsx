
import React from 'react';
import {
  View, Text
} from 'react-native';

export type Props = {
    title: string;
  };

export const Header: React.FC<Props> = ({title}) => {
    return (
      <View style={{backgroundColor:'yellow', height:50}}>
        <Text style={{textAlign:'center', fontSize:20, marginTop:8}}>{title}</Text>
      </View>
    );
  };