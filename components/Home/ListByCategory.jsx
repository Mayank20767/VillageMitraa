import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have installed @expo/vector-icons
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase';
import SliderListItem from '../../components/Home/SliderListItem';
import SchemeListItem from '../../components/Home/SchemeListItem';
import Category from '../../components/Home/Category';
import { Audio } from 'expo-av'; // For recording audio
import * as Speech from 'expo-speech'; // For text-to-speech
import axios from 'axios'; // For API calls


export default function ListByCategory() {
  const [itemList, setItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Schemes');
  const [loading, setLoading] = useState(false); // Loading indicator
  const [apiResponse, setApiResponse] = useState(''); // Store OpenAI API response
  const [recording, setRecording] = useState(null); // Manage recording state
  const [transcription, setTranscription] = useState('');


  useEffect(() => {
    GetitemList('Schemes');
  }, []);

  const GetitemList = async (category) => {
    setItemList([]);
    setSelectedCategory(category);

    const collectionName = category === 'Library' ? 'library' : category === 'Schemes' ? 'schemes' : null;
    if (collectionName) {
      const q = query(collection(db, collectionName));
      const querySnapshot = await getDocs(q);
  
      const items = [];
      querySnapshot.forEach(doc => {
        items.push(doc.data());
      });
      setItemList(items);
    }
  };

  const AssemblyAIAiapiKey = process.env.ASSEMBLY_AI_API_KEY
  // Start Recording Audio
  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        console.log('Starting recording..');
        const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
        setRecording(recording);
        console.log('Recording started');
      } else {
        console.log('Permission to access microphone is required!');
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Stop Recording Audio
  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(null);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); // Get audio file URI
    console.log('Recording stopped and stored at', uri);

    // Transcribe the recorded audio
    await transcribeAudioWithAssemblyAI(uri);
  };

  const transcribeAudioWithAssemblyAI = async (audioUri) => {
    setLoading(true);
    try {
      // Step 1: Upload the audio file to AssemblyAI
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        name: 'audio.wav',
        type: 'audio/wav', // Ensure the correct file type
      });
      const uploadResponse = await axios.post(
        'https://api.assemblyai.com/v2/upload',
        formData,
        {
          headers: {
            Authorization: AssemblyAIAiapiKey,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      if (uploadResponse.status !== 200) {
        throw new Error('Failed to upload audio file');
      }
  
      const audioUrl = uploadResponse.data.upload_url;
      console.log('Audio URL:', audioUrl);
  
      // Step 2: Submit for transcription
      const transcriptResponse = await axios.post(
        'https://api.assemblyai.com/v2/transcript',
        { audio_url: audioUrl },
        {
          headers: {
            Authorization: AssemblyAIAiapiKey,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (transcriptResponse.status !== 200) {
        throw new Error('Failed to submit for transcription');
      }
  
      const transcriptId = transcriptResponse.data.id;
      console.log('Transcript ID:', transcriptId);
  
      // Step 3: Poll for transcription result
      const pollingEndpoint = `https://api.assemblyai.com/v2/transcript/${transcriptId}`;
      let transcriptionResult = null;
  
      while (!transcriptionResult) {
        const pollingResponse = await axios.get(pollingEndpoint, {
          headers: { Authorization: 'AssemblyAIKEY' },
        });
  
        if (pollingResponse.data.status === 'completed') {
          transcriptionResult = pollingResponse.data.text;
          setTranscription(transcriptionResult);
          fetchChatGPTResponse(transcriptionResult); // Optional: Send to GPT
        } else if (pollingResponse.data.status === 'failed') {
          console.error('Transcription failed:', pollingResponse.data);
          throw new Error('Transcription failed');
        } else {
          console.log('Waiting for transcription...');
          await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait 2 seconds
        }
      }
    } catch (error) {
      console.error('Error transcribing audio with AssemblyAI:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    } finally {
      setLoading(false);
    }
  };
  
  const openAiapiKey = process.env.OPEN_AI_API_KEY
  // Fetch ChatGPT Response
  const fetchChatGPTResponse = async (text) => {
    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: text }],
        },
        {
          headers: {
            Authorization: openAiapiKey,
            'Content-Type': 'application/json',
          },
        }
      );

      const aiResponse = response.data.choices[0].message.content;
      setApiResponse(aiResponse);
      console.log('ChatGPT Response:', aiResponse);

      // Speak out the response
      Speech.speak(aiResponse);
    } catch (error) {
      console.error('Error fetching ChatGPT response:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Category category={(value) => GetitemList(value)} />

      {selectedCategory === 'Library' ? (
        <FlatList
          data={itemList}
          horizontal
          renderItem={({ item }) => <SliderListItem items={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : selectedCategory === 'Schemes' ? (
        <FlatList
          data={itemList}
          renderItem={({ item }) => <SchemeListItem scheme={item} />}
          keyExtractor={(item, index) => index.toString()}
          style={styles.schemeList}
        />
      ) : (
        <View style={styles.helpContainer}>
          <Text style={styles.title}>Voice Input Chat</Text>
          <TouchableOpacity
            style={styles.micButton}
            onPress={recording ? stopRecording : startRecording}
          >
            <FontAwesome name={recording ? 'stop-circle' : 'microphone'} size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.statusText}>{recording ? 'Recording...' : 'Press the mic to start'}</Text>

          {loading && <ActivityIndicator size="large" color="#0000ff" />}

          {transcription ? (
            <Text style={styles.responseText}>Transcription: {transcription}</Text>
          ) : null}

          {apiResponse ? (
            <Text style={styles.responseText}>ChatGPT Response: {apiResponse}</Text>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  schemeList: {
    marginTop: 10,
  },
  helpContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 15,
  },
  micButton: {
    backgroundColor: '#ddd',
    padding: 20,
    borderRadius: 40,
  },
  helpText: {
    marginTop: 15,
    fontSize: 18,
    color: 'gray',
  },
  resultText: {
    marginTop: 15,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  apiResponse: {
    marginTop: 15,
    fontSize: 16,
    color: 'blue',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  micButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 20,
    marginBottom: 10,
  },
  statusText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  responseText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
});
