import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { green, darkGreen } from '../../components/Colors';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: darkGreen,
                tabBarInactiveTintColor: 'black', 
            }}
        >
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Chat"
                // screenOptions={{
                //     headerShown: true,
                //     tabBarActiveTintColor: darkGreen,
                //     tabBarInactiveTintColor: 'black', 
                // }}
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="chatbox-outline" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Favorite"
                options={{
                    title: 'Favorite',
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="favorite-border" size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="people-outline" size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
