import { View, Text, Image } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LibraryInfo({items}) {
  return (
    <View>
      <Image source={{uri:items.imageUrl}}
        style={{
            width:'100%',
            height:400,
            objectFit:'cover'
        }}
      />
      <View style={{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center'
      }}>
        <View>
            <Text style={{
                fontFamily:'montserrat-medium',
                fontSize:30
            }}>{items?.name}</Text>
        </View>
        <Ionicons name="heart-outline" size={34} color="black" />
      </View>
    </View>
  )
}