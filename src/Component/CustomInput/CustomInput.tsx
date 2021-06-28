
import React from 'react';
import {
   View, TextInput , Text
} from 'react-native';

export type Props = {
    value : any, 
    placeholder : string,
    autoCompleteType : any,
    autoCapitalize : any,
    onChange : any,
    numberOfLines : any,
  };

export const CustomInput: React.FC<Props> = ({value, 
    placeholder, 
    autoCompleteType, 
    autoCapitalize,
    onChange,
    numberOfLines
    }) => {
    return (
        <TextInput
        value={value}
        placeholder={placeholder}
        autoCompleteType={autoCompleteType}
        autoCapitalize={autoCapitalize}
        onChangeText={value => onChange(value)}
        multiline={true}
        numberOfLines={numberOfLines}
        style={{
          borderWidth: 1,
          width: '90%',
          marginTop: '5%',
          backgroundColor: '#fff',
          paddingLeft: 20,
          alignSelf: 'center'
        }}
      />
    );
  };
