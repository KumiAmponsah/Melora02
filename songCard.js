import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, ScrollView, Image } from 'react-native'; // Added Image import
import getSongs from "./getSongs";
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from "@expo/vector-icons";

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);

export default function Cards({ route }) {
    const navigation = useNavigation();
    const { searchQueryId } = route.params;
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const soundRef = useRef(new Audio.Sound());

    useEffect(() => {
        if (!searchQueryId) {
            setError("Invalid search query ID");
            return;
        }

        const fetchSongs = async () => {
            try {
                const result = await getSongs(searchQueryId);
                setSongs(result);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchSongs();
    }, [searchQueryId]);

    useEffect(() => {
        return () => {
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const playSong = async (song) => {
        try {
            setIsLoading(true);
            if (currentSong !== song) {
                await soundRef.current.unloadAsync();
                const { sound, status } = await Audio.Sound.createAsync(
                    { uri: song.song_url },
                    { shouldPlay: true },
                );
                await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
                soundRef.current = sound;
                setCurrentSong(song);
                setIsPlaying(true);
            } else {
                await soundRef.current.playAsync();
                setIsPlaying(true);
            }
        } catch (error) {
            console.error('Error playing sound:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const pauseSong = async () => {
        try {
            await soundRef.current.pauseAsync();
            setIsPlaying(false);
        } catch (error) {
            console.error('Error pausing sound:', error);
        }
    };

    const handlePlayPausePress = (song) => {
        if (isLoading) return; // Prevent multiple load attempts
        if (isPlaying && currentSong === song) {
            pauseSong();
        } else {
            playSong(song);
        }
    };

    const navigateToPlaySong = (song) => {
        navigation.navigate('PlaySong', { song });
    };

    if (error) {
        return (
            <LinearGradient colors={['#e66465', '#9198e5']} style={styles.canvas}>
                <Text style={styles.text}>Error: {error}</Text>
            </LinearGradient>
        );
    }

    return (
        <View style={styles.canvas}>
            {songs.map((song, index) => (
                <View key={index} style={styles.textBox}>
                    {song.album_art_url ? (
                        <ImageBackground
                            source={{ uri: song.album_art_url }}
                            style={styles.image}
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)', 'rgba(0, 0, 0, 1)']}
                                style={styles.gradient}
                            />
                            <TouchableOpacity
                                style={styles.lyricsIcon}
                                onPress={() => navigation.navigate('LyricsScreen')}
                            >
                                <Image
                                    source={require('./assets/music.png')} // Path to your music.png
                                    style={styles.icon}
                                />
                                <Text style={styles.lyricsText}>Lyrics</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    ) : (
                        <Text style={styles.text}>No album art available</Text>
                    )}
                </View>
            ))}
            <LinearGradient colors={['transparent','rgba(0, 0, 0, 0.007)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 1)']} style={styles.gradientText}>
                <ScrollView style={styles.Scrollable}>
                    {songs.map((song, index) => (
                        <React.Fragment key={index}>
                            <Text style={styles.textSong}>{song.title}</Text>
                            <Text style={styles.textArtist}>{song.artist}</Text>
                            <FontAwesome
                                name={isPlaying && currentSong === song ? "pause-circle" : "play-circle"}
                                size={50}
                                color="white"
                                onPress={() => navigateToPlaySong(song)}
                                style={styles.circlePlay}
                            />
                            <View style={styles.TrackInfo}>
                                <Text style={styles.trackInfoText}>Track Information</Text>
                                <Text style={styles.trackDetails}>Genre: {song.genre}</Text>
                                <Text style={styles.trackDetails}>Released: {song.release_date}</Text>
                            </View>
                        </React.Fragment>
                    ))}
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        padding: 4,
        textAlign: 'center',
        backgroundColor: '#000000ea',
    },
    textBox: {
        alignContent: 'center',
        alignSelf: 'center',
        marginBottom: 16,
    },
    textSong: {
        color: '#ffffff',
        marginTop: 200,
        marginLeft: 100,
        fontSize: 25,
        fontWeight: '700',
        marginRight: 20,
    },
    textArtist: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '300',
        marginLeft: 100,
        marginTop: 12,
    },
    TrackInfo: {
        marginLeft: 100,
        marginTop: 90,
    },
    image: {
        width: 400,
        height: 490,
        marginBottom: 10,
        justifyContent: 'flex-end',
    },
    gradient: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
    },
    gradientText: {
        height: '100%',
        marginTop: -350,
        width: '200%',
        marginLeft: -100,
    },
    trackDetails: {
        color: 'grey',
        marginBottom: 4,
    },
    trackInfoText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '300',
        marginLeft: -5,
        marginTop: 12,
        marginBottom: 15,
    },
    Scrollable: {
        marginTop: 50,
    },
    circlePlay: {
        marginLeft: 425,
        marginTop: -56,
    },
    lyricsIcon: {
        position: 'absolute',
        top: 40,
        right: 30,
        zIndex: 1,
    },
    icon: {
        width: 30, // Size of the icon
        height: 30, // Size of the icon
    },
    lyricsText:{
        color:'#a7a2a2',
        fontWeight: '500'
    }
});
