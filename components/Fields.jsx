import React from 'react';
import {TextInput} from 'react-native';
import {darkGreen} from './Colors';

const Field = props => {
  return (
    <TextInput
      {...props}

      style={{borderRadius: 100,
        color: darkGreen, 
        padding:15,
        width:'70%',
        marginVertical:10,
        backgroundColor: 'rgb(220,220, 220)',
        }}
      placeholderTextColor={darkGreen}>
      </TextInput>
  );
};

export default Field;