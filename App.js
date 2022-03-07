import { StyleSheet, Text, SafeAreaView, Pressable, View, Image, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";
import Images from "./Themes/images";
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";
import Track from "./Track";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token"
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
        const res = await myTopTracks(token);
      // const res = await albumTracks(ALBUM_ID, token);
      setTracks(res);
    };

    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);
    
    const renderItem = ({item,index}) => (
            <Track
                songTitle={item.name}
                songArtist={item.artists[0].name}
                songIndex={index}
                albumName={item.album.name}
                albumImageUrl={item.album.images[0].url}
                duration={millisToMinutesAndSeconds(item.duration_ms)}/>
    );
    
    let contentDisplayed=null;
    if (token){
        contentDisplayed=
        <View style={styles.container}>
                <View style={styles.myTopTracks}>
                  <Image style={styles.spotifyLogo} source={Images.spotify}/>
                  <Text style={styles.topTracksText}>My Top Tracks</Text>
                </View>
        <View style={{flex: 10}}>
                  <FlatList
                    data={tracks}
                    renderItem={(item) => renderItem(item)}
                    keyExtractor={(item, index) => index}
                  />
                </View>
              </View>
    }
    else {
        contentDisplayed=
        <Pressable onPress={promptAsync}>
                < View style={styles.button}>
                  <Image style={styles.spotifyLogo} source={Images.spotify}/>
                  <Text style={styles.spotifyText}>CONNECT WITH SPOTIFY</Text>
                </View>
              </Pressable>
    }
    
  return (
    <SafeAreaView style={styles.container}>
      {contentDisplayed}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
spotifyLogo:{
    resizeMode: 'contain',
    width: '8%'
},
spotifyText:{
    color: 'white',
    fontWeight: 'bold'
},
button: {
    flex: 0.2,
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.spotify,
    borderRadius: 99999,
},
topTracksText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
},
myTopTracks: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
},
});
