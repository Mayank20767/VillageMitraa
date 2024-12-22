import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser, useClerk } from '@clerk/clerk-expo';


const Profile = () => {
  const router = useRouter();
  const { user } = useUser();
  const clerk = useClerk();
  const userImage = user?.imageUrl || null; 

  const handleLogout = async () => {
    try {
      await clerk.signOut();
      router.replace('/login');
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const options = [
    { id: '1', label: 'Feedback', onPress: () => console.log('feedback') },
    { id: '2', label: 'Settings', onPress: () => console.log('Settings') },
    { id: '3', label: 'Change Password', onPress: () => console.log('Change Password') },
    { id: '4', label: 'Contact Us', onPress: () => console.log('Contact Us') },
    { id: '5', label: 'Logout', onPress: handleLogout },
  ];

  return (
    <View style={styles.container}>
      {/* Profile Image and Details */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: userImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>{user?.fullName || 'Guest User'}</Text>
        </View>
      </View>

      {/* Profile Options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.optionItem} onPress={item.onPress}>
            <Text style={styles.optionText}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileInfo: {
    fontSize: 16,
    color: '#666',
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 18,
  },
});

export default Profile;
