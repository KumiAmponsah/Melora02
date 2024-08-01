import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
const LyricsScreen = () => {
  const [lyrics, setLyrics] = useState('');
  const artist = 'Imagine Dragons';
  const song = 'Believer';
  useEffect(() => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`)
      .then(response => response.json())
      .then(data => setLyrics(data.lyrics))
      .catch(error => console.error(error));
  }, [artist, song]);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.lyricsText}>{lyrics}</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0131',
  },
  scrollView: {
    padding: 20,
  },
  lyricsText: {
    color: 'white',
    fontSize: 16,
  },
});
export default LyricsScreen;