import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useUser } from '@clerk/clerk-expo'; // For Clerk login
import { db } from '../../components/firebase'; // Import Firestore
import {
  collection,
  query,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { useUserContext } from '../../components/UserContext';

export default function Chat({ firestoreUserData }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const { user: clerkUser } = useUser(); // Clerk user info
  const router = useRouter();

  // Fetch chat messages in real-time
  useEffect(() => {
    const messagesRef = collection(db, 'chats');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const { userData } = useUserContext();
  // console.log('Printing user',userData)
  // Handle sending messages
  const handleSendMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Error', 'Message cannot be empty.');
      return;
    }

    let username, userEmail;

    // Check Clerk user
    if (clerkUser) {
      username = clerkUser.firstName || clerkUser.username || 'Anonymous';
      userEmail = clerkUser.emailAddresses?.[0]?.emailAddress || 'NoEmail';
    } 
    // Fallback to Firestore user
    else if (userData) {
      username = userData.fullname || 'Firestore User';
    userEmail = userData.email || 'NoEmail';
    } else {
      Alert.alert('Error', 'No user data found.');
      return;
    }

    console.log('Sending message with user:', { username, userEmail });
    try {
      await addDoc(collection(db, 'chats'), {
        username,
        userId: userEmail,
        message,
        timestamp: serverTimestamp(),
      });
      setMessage(''); // Clear input field
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'Could not send message.');
    }
  };

  // Render chat messages
  const renderMessage = ({ item }) => {
    const isMyMessage =
      (clerkUser?.emailAddresses?.[0]?.emailAddress === item.userId) ||
      (userData?.email === item.userId);

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Discussion</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messageList}
      />

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#006A42',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    marginTop: 30,
    fontWeight: 'bold',
    fontFamily: 'montserrat-regular',
  },
  messageList: { padding: 25, marginTop: 20 },
  messageContainer: {
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  myMessage: { alignSelf: 'flex-end', backgroundColor: '#dcf8c6' },
  otherMessage: { alignSelf: 'flex-start', backgroundColor: '#f1f1f1' },
  username: { fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  messageText: { fontSize: 16 },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  sendButtonText: { color: '#fff', fontWeight: 'bold' },
});
