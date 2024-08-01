import { FontAwesome } from "@expo/vector-icons";
import { Text, View, FlatList, TextInput, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import SongComponent from "./SongComponent";
import ArtisteComponent from "./ArtisteComponents";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const SearchScreen2 = () => {
  const [search, setSearch] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleInputChange = (text) => {
    setQuery(text);
    setSearch(text.length > 0);
  };

  const handleSongPress = (item) => {
    if (item && item.id) {
      navigation.navigate('songCard', { searchQueryId: item.id });
    } else {
      console.error("Invalid item id");
    }
  };

  const handleArtistPress = (artist) => {
    console.log(`Artist pressed: ${artist.name}`);
  };

  useEffect(() => {
    const fetchSongsAndArtists = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        const songResponse = await supabase
          .from("songs")
          .select("id, title, artist, album_art_url")
          .ilike("title", `%${query}%`);

        const artistResponse = await supabase
          .from("artists")
          .select("name")
          .ilike("name", `%${query}%`);

        if (songResponse.error) throw songResponse.error;
        if (artistResponse.error) throw artistResponse.error;

        setSongs(songResponse.data || []);
        setArtists(artistResponse.data || []);
        console.log(songResponse.data, artistResponse.data);
      } catch (error) {
        setFetchError("Could not fetch data. Please try again.");
        setSongs([]);
        setArtists([]);
        console.error(error);
      }

      setLoading(false);
    };

    if (search) {
      fetchSongsAndArtists();
    } else {
      setSongs([]);
      setArtists([]);
    }
  }, [query]);

  return (
    <LinearGradient
      colors={['#5e16ec', '#1f0f36']}
      style={styles.container}
    >
      <View>
        <View style={styles.inputContainer}>
          <FontAwesome name="chevron-circle-left" size={23} color="white" style={styles.topicon} onPress={() => navigation.navigate('Home')}/>
          <View style={styles.searchbox}>
            <TextInput
              style={styles.input}
              placeholder="Discover your songs or artists"
              placeholderTextColor="white"
              onChangeText={handleInputChange}
              value={query}
            />
          </View>
          <FontAwesome
            name="close"
            size={21}
            color="white"
            style={styles.topicon}
            onPress={() => handleInputChange("")}
          />
        </View>

        <View style={styles.line} />

        {!search && (
          <TouchableOpacity style={styles.genreContainer}>
            <FontAwesome name="circle-o-notch" size={30} color="white" style={styles.genreIcon}/>
            <Text style={styles.genreText}>R&B</Text>
          </TouchableOpacity>
        )}

        {!search && (
          <TouchableOpacity style={styles.genreContainer}>
            <FontAwesome name="circle-o-notch" size={30} color="white" style={styles.genreIcon}/>
            <Text style={styles.genreText}>Hip-Hop</Text>
          </TouchableOpacity>
        )}

        {!search && (
          <TouchableOpacity style={styles.genreContainer}>
            <FontAwesome name="circle-o-notch" size={30} color="white" style={styles.genreIcon} />
            <Text style={styles.genreText}>Gospel</Text>
          </TouchableOpacity>
        )}

        {!search && (
          <TouchableOpacity style={styles.genreContainer}>
            <FontAwesome name="circle-o-notch" size={30} color="white" style={styles.genreIcon} />
            <Text style={styles.genreText}>Country</Text>
          </TouchableOpacity>
        )}

        {!search && (
          <TouchableOpacity style={styles.genreContainer}>
            <FontAwesome name="circle-o-notch" size={30} color="white" style={styles.genreIcon} />
            <Text style={styles.genreText}>Pop</Text>
          </TouchableOpacity>
        )}

        <FlatList
          ListHeaderComponent={() => (
            <View style={{ margin: 10 }}>
              {search && (
                <>
                  <Text style={styles.headerText}>Top Results</Text>
                  <Text style={styles.subHeaderText}>Songs</Text>
                  {loading && <Text style={{ color: "white" }}>Loading...</Text>}
                  {fetchError && <Text style={{ color: "red" }}>{fetchError}</Text>}
                </>
              )}
            </View>
          )}
          data={songs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleSongPress(item)}>
              <SongComponent
                Artiste={item.artist}
                SongTitle={item.title}
                imagePlaceholder={{ uri: item.album_art_url }}
              />
            </Pressable>
          )}
          ListFooterComponent={() => (
            <View style={{ margin: 10 }}>
              {search && (
                <>
                  <Text style={styles.subHeaderText}>Artists</Text>
                  {loading && <Text style={{ color: "white" }}>Loading...</Text>}
                  {fetchError && <Text style={{ color: "red" }}>{fetchError}</Text>}
                  <FlatList
                    data={artists}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <Pressable onPress={() => handleArtistPress(item)}>
                        <ArtisteComponent name={item.name} />
                      </Pressable>
                    )}
                  />
                  <Text style={styles.footerText}>View more</Text>
                </>
              )}
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    padding: 10,
  },
  input: {
    height: 30,
    paddingLeft: 20,
    fontSize: 16,
    color: "white",
    flex: 1,
  },
  searchbox: {
    opacity: 0.6,
    height: 50,
    width: 300,
    borderRadius: 19,
  },
  topicon: {
    color: '#1c1c1c',
  },
  line: {
    height: 1,
    backgroundColor: '#c0c0c0',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  inputContainer: {
    padding: 10,
    borderRadius: 10,
    marginTop: 35,
    alignSelf: "center",
    marginVertical: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  genreContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#bb9300",
    padding: 10,
    width: 330,
    borderRadius: 10,
    paddingVertical: 30,
    marginVertical: 12,
    marginLeft: 23,
    opacity: 0.9,
  },
  genreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 50,
  },
  genreIcon: {
    marginLeft: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  subHeaderText: {
    fontSize: 30,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 20,
    fontWeight: "400",
    color: "lightblue",
    marginTop: 20,
  },
});

export default SearchScreen2;
