import { Text, View,ScrollView } from "react-native";
import SongComponent from "./Components/SongComponent";
import ResultsPage from "./Components/ResultsPage";
import ArtisteComponents from "./Components/ArtisteComponents";
const imagePlaceholder = require("./assets/image.jpg");
const ArtiseImage = require("./assets/Artiste.jpg");
const Next= require("./assets/im.jpg");
const Nextnext= require("./assets/lala.jpg");
const Again=require("./assets/Cake.jpg");
const Go= require("./assets/ok.jpg");
const App = () => {
  return (
    <View style = {styles.container}>
<ScrollView>
      <View style={{ margin: 10}}>
      <Text style={{ fontWeight: "200", marginBottom: 20 }}></Text>
      <ResultsPage />
      <Text style={{ fontSize: 30, fontWeight: 600, color: "#fff", marginBottom: 20 }}>Top Results</Text>
      <SongComponent Artiste="Jenny" SongTitle="Stupid in love" imagePlaceholder={imagePlaceholder} />
      <ArtisteComponents name="Jenny"imagePlaceholder={ArtiseImage}/>
      </View>
      <Text style={{ fontSize: 30, fontWeight: 600, color: "#fff", marginBottom: 20 }}>Songs</Text>
      <SongComponent Artiste="Jenny" SongTitle="Stupid in love(Acoustic)"imagePlaceholder={Next}/>
<SongComponent Artiste="Remix" SongTitle="Stupid in love (Jen and K)"imagePlaceholder={Nextnext}/>
<SongComponent Artiste="Naya" SongTitle="Stupid love"imagePlaceholder={Again}/>
<SongComponent Artiste="Solo" SongTitle="Stupid love" imagePlaceholder={Go}/>
<Text style={{fontSize:20,fontWeight:400,color:"lightblue",marginBottom:20}}>View more</Text>
</ScrollView>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#252525"
  },
};

export default App;


