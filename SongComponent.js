import { View, Text, Image, StyleSheet } from "react-native";

const SongComponent = ({ SongTitle, Artiste, imagePlaceholder }) => {
  return (
    <View style={styles.container}>
      <View>
        {<Image source={imagePlaceholder} style={styles.image}/>/*<Image source={imagePlaceholder} style={styles.image} /> */}
      </View>
      <View style={styles.text}>
        <Text style={styles.text}>{SongTitle}</Text>
        <Text style={styles.textSecondary}>{Artiste}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingBottom: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  textSecondary: {
    color: "grey",
    fontSize: 18,
  },
});

export default SongComponent;
