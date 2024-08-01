// PlaySong.js

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, BackHandler, Animated, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function PlaySong() {
    const route = useRoute();
    const navigation = useNavigation();
    const { song } = route.params;
    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef(new Audio.Sound());

    const screenWidth = Dimensions.get('window').width;
    const titleWidth = screenWidth + 300; // Adjust based on your text length and desired effect

    // Create animated value
    const scrollAnim = useRef(new Animated.Value(0)).current;

    // Animation configuration
    const scrollAnimation = () => {
        scrollAnim.setValue(0);
        Animated.loop(
            Animated.sequence([
                Animated.timing(scrollAnim, {
                    toValue: -titleWidth,
                    duration: 10000, // Duration of scrolling animation
                    useNativeDriver: true,
                }),
                Animated.timing(scrollAnim, {
                    toValue: 0,
                    duration: 1, // Short delay to reset position
                    useNativeDriver: true,
                }),
            ])
        ).start();
    };

    const playPauseSong = async () => {
        try {
            if (isPlaying) {
                await soundRef.current.pauseAsync();
            } else {
                if (soundRef.current._loaded) {
                    await soundRef.current.playAsync();
                } else {
                    const { sound } = await Audio.Sound.createAsync(
                        { uri: song.song_url },
                        { shouldPlay: true }
                    );
                    soundRef.current = sound;
                }
            }
            setIsPlaying(!isPlaying);
            if (!isPlaying) scrollAnimation(); // Start scrolling when the song starts
        } catch (error) {
            console.error('Error playing/pausing sound:', error);
        }
    };

    const skipToPrevious = () => {
        // Functionality for previous song
        console.log('Previous button pressed');
    };

    const skipToNext = () => {
        // Functionality for next song
        console.log('Next button pressed');
    };

    const handleBackButtonPress = async () => {
        if (isPlaying) {
            await soundRef.current.stopAsync();
            setIsPlaying(false);
        }
        navigation.goBack();
        return true; // Return true to prevent default back action
    };

    useEffect(() => {
        // Add back button listener
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);

        // Cleanup function to remove listener
        return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPress);
    }, [isPlaying]);

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: song.album_art_url }} style={styles.albumArt} />
            <View style={styles.songTitleContainer}>
                <Animated.View style={[styles.songTitle, { transform: [{ translateX: scrollAnim }] }]}>
                    <Text style={styles.songTitleText}>{song.title}</Text>
                    <Text style={styles.artistText}> - {song.artist}</Text>
                    <Text style={[styles.songTitleText, { position: 'absolute', left: titleWidth }]}>
                        {song.title} - {song.artist}
                    </Text>
                </Animated.View>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity onPress={skipToPrevious} style={styles.controlButton}>
                    <FontAwesome name="step-backward" size={40} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={playPauseSong} style={styles.controlButton}>
                    <FontAwesome
                        name={isPlaying ? "pause-circle" : "play-circle"}
                        size={60}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext} style={styles.controlButton}>
                    <FontAwesome name="step-forward" size={40} color="white" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    albumArt: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },
    songTitleContainer: {
        overflow: 'hidden',
        width: '100%',
        height: 50, // Adjust based on your font size and desired height
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    songTitle: {
        flexDirection: 'row',
        position: 'absolute',
        whiteSpace: 'nowrap', // Ensure that text stays in one line
    },
    songTitleText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    artistText: {
        color: 'white',
        fontSize: 24,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlButton: {
        marginHorizontal: 20,
    },
});
