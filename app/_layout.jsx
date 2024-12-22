import { Stack } from "expo-router"; // Expo Router's Stack for navigation
import { useFonts } from "expo-font";
import { View, ActivityIndicator, Text } from "react-native";
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store'
import { UserProvider } from '../components/UserContext';
const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {

  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
  const [fontsLoaded] = useFonts({
    'outfit': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-regular': require('../assets/fonts/Outfit-Regular.ttf'),
    'montserrat-regular': require('../assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    'montserrat-medium': require('../assets/fonts/Montserrat-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <UserProvider>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <ClerkLoaded>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ClerkLoaded>
      </ClerkProvider>
    </UserProvider>


  );
}

