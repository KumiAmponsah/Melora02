import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import ACRCloudService from './ACRCloudService';

const SongMetadata = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    const songList = await ACRCloudService.listSongs();

    if (songList && songList.data) {
      setSongs(songList.data);
    }
  };

  const renderSongItem = ({ item }) => {
    return (
      <View style={{ marginBottom: 20 }}>
        <Text>Title: {item.metadata.title}</Text>
        <Text>Album: {item.metadata.album}</Text>
        <Text>Genres: {item.metadata.genre.join(', ')}</Text>
      </View>
    );
  };

  return (
    <View>
      <Button title="Refresh Songs" onPress={fetchSongs} />
      <FlatList
        data={songs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.itemId.toString()}
      />
    </View>
  );
};

export default SongMetadata;
