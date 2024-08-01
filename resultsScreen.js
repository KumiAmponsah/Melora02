import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, ImageBackground, Pressable, Animated } from 'react-native';
import { supabase } from './supabase'; // Adjust the path if needed
import { useNavigation } from '@react-navigation/native';

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

export default function ResultsScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('songs')
        .select()
        .ilike('title', `%${query}%`); // Assuming you're searching by song title

      if (error) {
        setError(error.message);
      } else {
        setResults(data);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const songDisplay = (item) => {
    navigation.navigate('songCard', { searchQueryId: item.id });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for a song"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={fetchResults} />

      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.item} onPress={() => songDisplay(item)}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>Artist: {item.artist}</Text>
            <Text style={styles.album}>Album: {item.album}</Text>
            {item.album_art_url ? (
              <AnimatedImage
                source={{ uri: item.album_art_url }}
                style={styles.image}
              >
                <View style={styles.overlay} />
              </AnimatedImage>
            ) : (
              <Text style={styles.text}>No album art available</Text>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 16,
  },
  album: {
    fontSize: 14,
    color: '#555',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 10,
    justifyContent: 'flex-end', // Align gradient overlay at the bottom
  },
  overlay: {
    height: '50%', // Adjust the height as needed
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)', // Semi-transparent black
    position: 'absolute',
    bottom: 0,
  },
  text: {
    color: '#000000',
    marginBottom: 8,
    marginLeft: 100,
  },
});
