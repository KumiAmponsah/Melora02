import React, { useRef, useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, PanResponder, Dimensions, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import getArtists from './getArtists';
import ArtistCard from './ArtistCard';

const { width, height } = Dimensions.get('window');

export default function ArtistsPage() {
  const navigation = useNavigation();
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const artistIds = [
    'f36cbd69-ab60-6395-1cf7-a8463da0b85d', 
    '8877eb49-a8ce-230b-dc61-d24f90b890eb', 
    '75970a38-b5fa-2cfe-e78e-4182d3556650', 
    '5941347c-2c62-149f-66ec-2c47b47cbf6a', 
    '06c43ea0-fe15-8c73-2572-3b092071bc8b', 
    '28d44f11-7e69-4762-5082-3271a067f786', 
    'b59f2e4b-0894-e14f-28a4-87f071a4df81', 
    'c94bdc03-cbb7-65ee-8fbf-1131e008487e',
    '83c7c52e-60a4-3562-56c2-f59c97a8dc9a',
    '8e70b49f-ab08-28e0-e287-a7e43b0e4da8'
  ];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -100) {
          navigation.navigate('Home');
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      try {
        const result = await getArtists(artistIds);
        setArtists(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerElements}>
      <FontAwesome name="chevron-left" size={24} color="white" style={styles.arrowIcon} onPress={() => navigation.goBack()} />
      <Text style={styles.headerText}>Artists</Text>
    </View>
  );

  return (
    <>
      {renderHeader()}
      <ScrollView style={styles.container} {...panResponder.panHandlers}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.listContainer}>
            <FlatList
              data={artists}
              renderItem={({ item }) => (
                <ArtistCard name={item.name} ArtistImage={item.artist_image_url} ArtistName={item.name} />
              )}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.listContent}
              horizontal={false}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000ea',
    paddingLeft:8
  },
  listContainer: {
    flex: 1,
    width: '100%',
    height: '190%',
  },
  headerElements: {
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#000000ea',
  },
  arrowIcon: {
    marginTop: 24,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
    marginLeft: 20,
    marginTop: 24,
  },
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
});
