import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SchemeListItem({ scheme }) {

  const router = useRouter();

  const handlePress = (scheme) => {
    // Navigate to the scheme details page with the scheme ID and details as route parameters
    router.push({
      pathname: '/scheme-details',
      params: {
        name: scheme.name,
        details: scheme.details,
        url:scheme.url,
      },
    });
  };

  return (
    <TouchableOpacity
    onPress={() => handlePress(scheme)}
    >
      <View style={styles.container}>
        <Text style={styles.name}>{scheme.name}</Text>
        <Text style={styles.description} numberOfLines={3}>{scheme.desc}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
});
