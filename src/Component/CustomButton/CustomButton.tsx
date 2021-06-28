
import React from 'react';
import {
    TouchableOpacity, Text
} from 'react-native';

export type Props = {
    title: string;
    onPress : any,
    backgroundColor : string
  };

export const CustomButton: React.FC<Props> = ({title, onPress, backgroundColor}) => {
    return (
        <TouchableOpacity
        onPress={() => onPress()}
        style={{ width: 200,
          height: 50,
          backgroundColor: backgroundColor,
          borderRadius: 20,
          marginTop: '5%',
          alignSelf: 'center'}}>
        <Text style={{fontSize: 20, color: "white",
        textAlign: 'center',
        padding: 10}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };