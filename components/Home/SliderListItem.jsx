import React from 'react'
import { View, Text, Image } from 'react-native'
import { useRouter } from "expo-router";
import { TouchableOpacity } from 'react-native';

export default function SliderListItem({items}) {
  const router = useRouter();
  return (
    <TouchableOpacity 
    onPress={()=>router.push({
      pathname:'/library-details',
      params:items
    })}
    style={{
        padding:10,
        marginRight:15,
        backgroundColor:'white',
        borderRadius:10,
        height:195,
        marginTop:24
    }}>
        <Image source={{uri:items?.imageUrl}}
        style={{
            width:150,
            height:145,
            objectFit:'cover',
            borderRadius:10
        }}
        />
        <Text style={{
            fontFamily:'outfit',
            fontSize:15,
            marginTop:10
        }}>{items.name}</Text>
    </TouchableOpacity>
  )
}

