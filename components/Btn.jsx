import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Btn({ bgColor, btnLabel, textColor, fontFamily, Press }) {
  return (
    <TouchableOpacity
      onPress={Press}
      style={{
        backgroundColor: bgColor,
        borderRadius: 100,
        alignItems: 'center',
        width: 320,
        paddingVertical: 10,
        marginVertical: 12,
        marginStart: 22,
      }}>
      <Text style={{ color: textColor, fontSize: 25, fontWeight: 'bold', fontFamily: fontFamily }}>
        {btnLabel}
      </Text>
    </TouchableOpacity>
  );
}
