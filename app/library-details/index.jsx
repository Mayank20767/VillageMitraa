import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
import LibraryInfo from '../../components/LibraryDetails/LibraryInfo';
import LibraryDesc from '../../components/LibraryDetails/LibraryDesc';
import { useLocalSearchParams } from 'expo-router';

export default function LibraryDetails() {
  const items = useLocalSearchParams();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LibraryInfo items={items} />
        <LibraryDesc items={items} />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
