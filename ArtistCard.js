// import React from 'react';
// import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const ArtistCard = ({ name, ArtistImage,ArtistName }) => {
//   const navigation = useNavigation()
//   return (
//     <View style={styles.container}>
//       <Pressable  style={styles.container}onPress={navigation.navigate('manuelApp', { artistName:ArtistName }, {ArtistImage})}>
//       <Image source={{ uri: ArtistImage }} style={styles.image} />
//       <View>
//         <Text style={styles.text}>{name}</Text>
//       </View>
//       </Pressable>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   image: {
//     width: 75,
//     height: 75,
//     borderRadius: '50%',
//     marginRight: 10,
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default ArtistCard;

import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ArtistCard = ({ name, ArtistImage, ArtistName }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable style={styles.container} onPress={() => navigation.navigate('manuelApp', { artistName: ArtistName, ArtistImage })}>
        <Image source={{ uri: ArtistImage }} style={styles.image} />
        <View>
          <Text style={styles.text}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ArtistCard;
