import { View, Text, Image, StyleSheet } from "react-native";

const ArtisteComponents = ({ name, imagePlaceholder }) => {
  return (
    <View style={styles.container}>
      <View>
        {/* <Image source={imagePlaceholder} style={styles.image} /> */}
      </View>
      <View style={styles.text}>
        <Text style={styles.text}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  textSecondary: {
    color: "grey",
  },
});

export default ArtisteComponents;
