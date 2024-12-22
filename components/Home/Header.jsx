import { useUser } from '@clerk/clerk-expo';
import React from 'react';
import { View, Text, Image } from 'react-native';

const Header = ({ firebaseUser }) => {
  const { user } = useUser();

  const userName = user?.fullName || firebaseUser?.fullName || "Guest";
  const userImage = user?.imageUrl || null; 

  return (
    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View>
        <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>Welcome,</Text>
        <Text style={{ fontFamily: 'outfit-regular', fontSize: 22 }}>{userName}</Text>
      </View>
      {userImage ? (
        <Image 
          source={{ uri: userImage }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      ) : (
        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#ccc' }} />
      )}
    </View>
  );
};

export default Header;
