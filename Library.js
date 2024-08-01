import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, PanResponder } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

import Praise from './assets/Praise.jpg';
import Joy from './assets/Joy.jpg';
import Born from './assets/Born.jpg';
import Good from './assets/Good.jpg';
import Sure from './assets/Sure.jpg';
import Same from './assets/Same.png';

const songTitles = [
  "Back To Life - Bethel Music and Zahriya Zachary",
  "Praise - Elevation Worship",
  "Been So Good - Elevation Worship",
  "Sure Been Good - Elevation Worship",
  "Same God - Elevation Worship",
  "joy. - for KING & COUNTRY",
];

const images = [
  Born,
  Praise,
  Good,
  Sure,
  Same,
  Joy,
];

const songs = [
  require('./assets/02. Back To Life (Live).mp3'),
  require('./assets/Praise_feat_Brandon_Lake_Chris_Brown_Chandler_Moore_Elevation_WorshipMP3.mp3'),
  require('./assets/Elevation_Worship,_Tiffany_Hudson_Been_So_Good_feat_Tiffany.mp4.mp3'),
  require('./assets/elevation_worship_sure_been_good_feat_tiffany_hudson_elevation_w.m4a'),
  require('./assets/Elevation_Worship_-_Same_God_CeeNaija.com_.mp3'),
  require('./assets/joy. - for KING   COUNTRY.m4a'),
];

export default function Library() {
  const navigation = useNavigation();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -100) { // Swipe left threshold
          navigation.navigate('Home'); // Navigate to Home on swipe left
        }
      },
      onPanResponderRelease: () => {},
    })
  ).current;

  return (
    <LinearGradient
      colors={['#5e16ec', '#000033']}
      style={styles.scrollContainer}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.viewContainer} {...panResponder.panHandlers}>
          <View style={styles.libraryTextAndIcon}>
            <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={styles.gearIcon}>
            <Image
                                    source={require('./assets/gear (1).png')} // Path to your music.png
                                    style={styles.icon2}
                                />
            </TouchableOpacity>
            <Text style={styles.libraryText}>Library</Text>
          </View>

          <View style={styles.tabContainer0}>
            <TouchableOpacity style={styles.tab0}>
              <Text style={styles.tabText}>Melora Hits</Text>
              <FontAwesome name="play-circle" size={21} color="#5e16ec" style={styles.tabIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab0} onPress={() => navigation.navigate('ArtistsPage')}>
              <Text style={styles.tabText}>Artists</Text>
              <Image
                                    source={require('./assets/artist.png')} // Path to your music.png
                                    style={styles.icon3}
                                />
            </TouchableOpacity>

            <TouchableOpacity style={styles.tab0}>
              <Text style={styles.tabText}>Playlists for you</Text>
              <Image
                                    source={require('./assets/playlist.png')} // Path to your music.png
                                    style={styles.icon3}
                                />
            </TouchableOpacity>
          </View>

          <View><Text style={styles.subHead}>Recent Hits</Text></View>
          <View style={styles.tabContainer1}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.tab}
                onPress={() => navigation.navigate('LibraryMusic', { songIndex: index, albumArt: image })}
              >
                <Image source={image} style={styles.tabImage} />
                <View style={styles.tabFooter}>
                  <Text style={styles.footerText}>{songTitles[index]}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.tab1}>
            <Text style={styles.discoverText}>See All Discoveries</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: height * 0.03,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: height * 0.005,
  },
  libraryTextAndIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.05
  },
  libraryText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: width * -0.08,
  },
  tabContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  tabContainer1: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.02,
    marginTop: height * 0.02,
  },
  tab: {
    width: (width / 2) - 30, 
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightgray',
    height: 290,
    borderRadius: 25,
    margin: 10,
    overflow: 'hidden',
  },
  tabImage: {
    width: '100%',
    height: '85%',
    borderRadius: 12,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },
  tabFooter: {
    width: '100%',
    height: '15%',
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  footerText: {
    color: 'white',
    fontSize: width * 0.03,
    marginRight: width * 0.02,
    marginLeft: width * 0.02,
    fontWeight: '700',
  },
  footerIcon: {
    color: 'white',
  },
  subHead: {
    fontSize: width * 0.065,
    color: '#ffffff',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  gearIcon: {
    right: width * 0.3,
  },
  tabText: {
    marginLeft: 25,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  tabIcon: {
    marginLeft: 'auto',
    marginRight: 15,
    right: 10,
  },
  playPauseIcon: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },
  tab0: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    opacity: 0.9,
    height: 50,
    borderRadius: 20,
    marginHorizontal: 3,
    flexDirection: 'row',
    margin: height * 0.01,
  },
  tabContainer0: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.02,
  },
  tab1: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    height: 60,
    borderRadius: 20,
    marginTop: 40,
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: 'white',
  },
  discoverText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon2: {
    width: 30, // Size of the icon
    height: 30, 
    color: 'white'
    // Size of the icon
},
  icon3: {
    width: 25, // Size of the icon
    height: 25, 
    color: 'white',
    marginLeft: 'auto',
    marginRight: 15,
    right: 10,
    // Size of the icon
},
});
