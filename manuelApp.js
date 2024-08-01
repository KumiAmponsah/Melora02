import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from './supabaseClient';
import { Ionicons } from '@expo/vector-icons';
import SongComponent from './SongComponent';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const ManuelApp = ({ route }) => {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { artistName, ArtistImage } = route.params;
  const [artistDetails, setArtistDetails] = useState({
    name: artistName,
    artist_image_url: ArtistImage,
  });

  const fetchResults = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("songs")
        .select("artist, title, song_url")
        .eq("artist", artistName);
      if (error) {
        setError(error.message);
        console.log("Songs fetch error:", error.message);
      } else {
        setResults(data);
        console.log("Songs data:", data);
      }
    } catch (error) {
      setError(error.message);
      console.log("Songs fetch catch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchArtist = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("artists")
        .select("name, artist_image_url")
        .eq("name", artistName);
      if (error) {
        setError(error.message);
        console.log("Artist fetch error:", error.message);
      } else {
        if (data.length > 0) {
          setArtistDetails(data[0]);
        }
        console.log("Artist data:", data);
      }
    } catch (error) {
      setError(error.message);
      console.log("Artist fetch catch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    fetchArtist();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="chevron-back" size={24} color="white" style={styles.icon} onPress={() => navigation.navigate('ArtistsPage')} />
        </View>
        <View style={styles.artistSection}>
          {artistDetails.artist_image_url && (
            <Image source={{ uri: artistDetails.artist_image_url }} style={styles.image} />
          )}
          <Text style={styles.artistName}>{artistDetails.name}</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Play all</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.sectionTitle}>In Your Library</Text>
        </View>
        <View style={styles.line} />
        {results.length > 0 ? (
          results.map((result, index) => (
            <SongComponent
              key={index}
              title={result.title}
              artistName={result.artist}
              image={{ uri: artistDetails.artist_image_url }}
              songUrl={result.song_url} 
            />
          ))
        ) : (
          <Text style={styles.noResultsText}>No songs found.</Text>
        )}
        <Text style={styles.sectionTitle}>Top Songs</Text>
        <View style={styles.line} />
        <View>
          {results.length > 0 ? (
            results.map((result, index) => (
              <SongComponent
                key={index}
                title={result.title}
                artistName={result.artist}
                image={{ uri: artistDetails.artist_image_url }}
                songUrl={result.song_url} 
              />
            ))
          ) : (
            <Text style={styles.noResultsText}>No top songs found.</Text>
          )}
        </View>
        {loading && <Text style={styles.loadingText}>Loading...</Text>}
        {error && <Text style={styles.errorText}>{error}</Text>}
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default ManuelApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0C071E",
  },
  header: {
    padding: 20,
  },
  artistSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  icon: {
    marginTop: 20,
    marginLeft: 6,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  artistName: {
    fontSize: 25,
    marginTop: 18,
    color: "white",
  },
  line: {
    height: 2,
    backgroundColor: '#fff',
    opacity: 0.3,
    marginVertical: 10,
    width: 350,
    marginLeft: 18,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#5e16ec',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    marginLeft: 28,
    marginRight: 28,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: "#fff",
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginVertical: 20,
  },
});
