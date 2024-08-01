import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function ShowDisplay({ route, navigation }) {
  const { metadata } = route.params;
  const [albumImageUrl, setAlbumImageUrl] = useState(metadata.album_art_url);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbumImage = async () => {
      if (!metadata.album_art_url) {
        try {
          const artist = encodeURIComponent(metadata.artist.replace(/ /g, '+'));
          const album = encodeURIComponent(metadata.album.replace(/ /g, '+'));

          const response = await axios.get(`https://itunes.apple.com/search?term=${artist}+${album}&entity=album`);
          const results = response.data.results;

          if (results.length > 0) {
            const hdImageUrl = results[0].artworkUrl100.replace('100x100', '1000x1000');
            setAlbumImageUrl(hdImageUrl);
          } else {
            setAlbumImageUrl(null);
          }
        } catch (err) {
          console.error('Failed to fetch album image:', err);
          setAlbumImageUrl(null);
        }
      }
      setLoading(false);
    };

    fetchAlbumImage();
  }, [metadata]);

  const openURL = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <LinearGradient colors={['#121212', '#1c1c1c']} style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : albumImageUrl ? (
          <Image source={{ uri: albumImageUrl }} style={styles.albumArt} resizeMode="cover" />
        ) : (
          <Text style={styles.noImageText}>No Image Available</Text>
        )}
      </View>
      <LinearGradient colors={['transparent', 'rgba(0, 0, 0, 0.8)']} style={styles.metadataContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.title}>{metadata.title}</Text>
          <Text style={styles.text}>Artist: {metadata.artist}</Text>
          <Text style={styles.text}>Album: {metadata.album}</Text>
          <Text style={styles.text}>Release Date: {metadata.release_date}</Text>
          <Text style={styles.text}>Genre: {metadata.genre}</Text>
          {metadata.song_url ? (
            <TouchableOpacity onPress={() => openURL(metadata.song_url)}>
              <Text style={[styles.text, styles.linkText]}>Song URL: {metadata.song_url}</Text>
            </TouchableOpacity>
          ) : null}
          {/* <TouchableOpacity onPress={() => openURL(metadata.song_url)} style={styles.playButton}>
            <FontAwesome name="play-circle" size={60} color="white" />
          </TouchableOpacity> */}
        </ScrollView>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  imageContainer: {
    marginTop: 60,
    height: height / 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  albumArt: {
    width: width - 40,
    height: height / 3 - 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
  noImageText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  metadataContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    color: '#e0e0e0',
    marginBottom: 8,
    textAlign: 'center',
  },
  linkText: {
    color: '#1e90ff',
    textDecorationLine: 'underline',
  },
  playButton: {
    marginTop: 30,
    alignSelf: 'center',
  },
});
