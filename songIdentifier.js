import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [message, setMessage] = useState("");
  const [metadata, setMetadata] = useState(null);

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        console.log('Recording started successfully:', recording);
        setRecording(recording);
        setMessage("Recording started...");

        // Automatically stop recording after 15 seconds
        setTimeout(async () => {
          if (recording) {
            console.log('Stopping recording after timeout...');
            await stopRecording(recording);
          } else {
            console.warn('Recording was not properly initialized.');
            setMessage("Recording was not started properly.");
          }
        }, 15000);
      } else {
        setMessage("Please grant permission to access the microphone.");
      }
    } catch (err) {
      console.error('Failed to start recording:', err);
      setMessage("Error starting recording.");
    }
  }

  async function stopRecording(currentRecording) {
    if (currentRecording) {
      try {
        await currentRecording.stopAndUnloadAsync();
        const fileUri = currentRecording.getURI();

        console.log('Recording stopped. File URI:', fileUri);

        setRecording(null);
        setMessage("Identifying song...");

        // Upload the recorded audio for fingerprinting
        const formData = new FormData();
        formData.append('song', {
          uri: fileUri,
          type: 'audio/3gp', // Match this with the actual type if different
          name: 'recording.3gp'
        });

        const response = await axios.post('http://192.168.122.193:5000/match', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if (response.data.error) {
          setMetadata(null);
          setMessage("No result found.");
        } else {
          setMetadata(response.data);
          setMessage("");
        }
      } catch (err) {
        console.error('Failed to stop recording:', err);
        setMessage("Error occurred.");
      }
    } else {
      console.warn('No active recording to stop.');
      setMessage("Recording was not started properly.");
    }
  }

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Button
        title={recording ? 'Recording...' : 'Start Recording'}
        onPress={recording ? null : startRecording}
      />
      {metadata && (
        <View style={styles.metadataContainer}>
          <Text>Title: {metadata.title}</Text>
          <Text>Artist: {metadata.artist}</Text>
          <Text>Album: {metadata.album}</Text>
          <Text>Release Date: {metadata.release_date}</Text>
          <Text>Genre: {metadata.genre}</Text>
          {metadata.album_art_url ? <Image source={{ uri: metadata.album_art_url }} style={styles.albumArt} /> : null}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  metadataContainer: {
    marginTop: 20,
  },
  albumArt: {
    width: 100,
    height: 100,
    marginTop: 10,
  }
});
