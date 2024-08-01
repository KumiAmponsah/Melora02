import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRoute } from '@react-navigation/native';

const MusicPlayer = () => {
    const route = useRoute();
    const { song } = route.params;
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const soundRef = useRef(new Audio.Sound());

    useEffect(() => {
        const loadAudio = async () => {
            try {
                setIsLoading(true);
                if (song.audio_url) {
                    const { sound } = await Audio.Sound.createAsync(
                        { uri: song.audio_url },
                        { shouldPlay: true }
                    );
                    setSound(sound);
                    soundRef.current = sound;
                    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
                } else {
                    console.error('No audio URL provided');
                }
            } catch (error) {
                console.error('Error loading sound:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadAudio();

        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, [song]);

    const handlePlayPause = async () => {
        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSkipBack = async () => {
        await sound.setPositionAsync(0);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.mainContent}>
                <Image source={{ uri: song.album_art_url }} style={styles.albumCover} />
                <View style={styles.textContainer}>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.artistName}>{song.artist}</Text>
                </View>
                <View style={styles.controlContainer}>
                    <TouchableOpacity onPress={handleSkipBack}>
                        <FontAwesome name="backward" size={48} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handlePlayPause}>
                        <FontAwesome name={isPlaying ? "pause-circle" : "play-circle"} size={72} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => sound.setPositionAsync(sound.durationMillis)}>
                        <FontAwesome name="forward" size={48} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1c1c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumCover: {
        width: 300,
        height: 300,
        borderRadius: 10,
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    songTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    artistName: {
        fontSize: 18,
        color: 'grey',
    },
    controlContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
    },
    loadingText: {
        color: 'white',
        fontSize: 18,
    },
});

export default MusicPlayer;
