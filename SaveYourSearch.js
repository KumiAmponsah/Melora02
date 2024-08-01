import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons'; // Ensure you have @expo/vector-icons installed
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const navigation = useNavigation();
  return (
    <GestureHandlerRootView style={styles.viewContainer}>
      <View style={styles.centerContainer}>
        <Image source={require('./assets/cloud2.png')} style={styles.cloudImage} />
        <Text style={styles.saveSearchText}>Save your searches</Text>
        <Text style={styles.accessText}>Access your Searches, all in one place</Text>
      </View>
      <View style={styles.centerContainerTabs}>
        <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={() => navigation.navigate('SignIn')}>
        <Image
                                    source={require('./assets/google.png')} // Path to your music.png
                                    style={styles.icon2}
                                />
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.emailButton]}>
          <FontAwesome name="envelope" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText} onPress={() => navigation.navigate('SignIn')}>Sign in with Email</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#07070a',
  },
  centerContainer: {
    alignItems: 'center',
  },
  centerContainerTabs: {
    marginTop: 20,
    width: '80%',
    top: 150,
    marginBottom: 90,
  },
  cloudImage: {
    width: 250,
    height: 250,
  },
  saveSearchText: {
    color: '#eae4e4',
    fontSize: 25,
    fontWeight: '700',
    marginTop: 20,
  },
  accessText: {
    color: '#6d6464',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  googleButton: {
    backgroundColor: 'gray',
    marginBottom: 10
  },
  emailButton: {
    backgroundColor: 'blue',
  },
  icon: {
    marginRight: 10,
    right: 40
  },
  buttonText: {
    color: '#eae4e4',
    fontSize: 18,
    fontWeight: '700',
  },
  icon2: {
    width: 30, // Size of the icon
    height: 30, // Size of the icon
    marginRight: 10,
    right: 40
},
});
