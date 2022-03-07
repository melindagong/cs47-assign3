import { StyleSheet, Text, View, Image} from "react-native";

export default function Track({songTitle, songArtist, songIndex, albumName, albumImageUrl, duration}){
    return(
      <View style={styles.container}>
           <Text style={{textAlignVertical: 'center',width: '8%', color: 'white'}}>{songIndex + 1}</Text>
          <Image style={{width: '15%'}} source={{uri: albumImageUrl}} />
          <View style={{padding: 10, width: '40%'}}>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{songTitle}</Text>
            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{songArtist}</Text>
          </View>
          <Text style={{padding: 5, width: '30%',color: 'white'}} numberOfLines={1} ellipsizeMode="tail">{albumName}</Text>
          <Text style={{padding: 5, width: '20%', color: 'white'}}>{duration}</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
container:{
        flex: 1,
        padding: 10,
        flexDirection: 'row',
      },
text: {
    flex: 1,
    textAlignVertical: 'center',
    color: 'white'
},
});
