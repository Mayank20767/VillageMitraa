import React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';

export default function SchemeDetails() {
  const { url } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      {url ? (
        <WebView source={{ uri: url }} style={styles.webview} />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>URL not provided</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    marginTop:50,
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});
