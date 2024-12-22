import { View, Text, TouchableOpacity, Linking, Alert } from 'react-native';
import React, { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';

export default function LibraryDesc({ items }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const openLink = (url) => {
        if (url) {
            Linking.openURL(url).catch(() =>
                Alert.alert('Error', 'Unable to open link')
            );
        } else {
            Alert.alert('Error', 'No link available');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>
                About {items?.name}
            </Text>
            
            <Text numberOfLines={isExpanded ? undefined : 5} style={{ fontFamily: 'outfit-regular', fontSize: 14 }}>
                {items?.desc}
            </Text>
            
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={{ fontFamily: 'outfit-regular', fontSize: 14, color: 'blue', marginTop: 5 }}>
                    {isExpanded ? 'Read less' : 'Read more'}
                </Text>
            </TouchableOpacity>
            
            <Text style={{ fontFamily: 'outfit', fontSize: 20, marginTop: 20 }}>
                Resource Link
            </Text>
            <TouchableOpacity onPress={() => openLink(items?.link)}>
                <Text style={{ fontFamily: 'outfit-regular', fontSize: 15, color: 'blue' }}>
                    {items?.link || "No link provided"}
                </Text>
            </TouchableOpacity>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
            }}>
                <Text style={{ fontFamily: 'outfit', fontSize: 20, marginTop: 20 }}>
                    Video
                </Text>
                <Entypo style={{ marginTop: 24 }} name="youtube" size={24} color="red" />
            </View>
            
            <TouchableOpacity onPress={() => openLink(items?.ytlink)}>
                <Text style={{ fontFamily: 'outfit-regular', fontSize: 15, color: 'blue' }}>
                    {items?.ytlink || "No link provided"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
