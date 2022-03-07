import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default function Track({ id, title, imageUrl, artists, album[], duration }) {
  return (
    <View style={styles.item}>
      <View style={styles.songIDSection}>
          <Text style={styles.songID}>{id}</Text>
        </View>
          <View style={styles.imageSection}>
          <Image style={styles.image} source={imageUrl}/>
          </View>
          <View style={styles.songSection}>
          <Text style={styles.songID}>{id}</Text>
        </View>
          
          
          
          
        <Text style={[styles.name, { color: color }]}>{name}</Text>
        <View style={[styles.info, { borderColor: color }]}>
          <Text>Price: {price}</Text>
          <Text>Quantity: {quantity}</Text>
        </View>
      </View>
      <Image style={styles.image} source={imageUrl}/>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    backgroundColor: 'black',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textSection: {
    flex: 1,
  },
imageSection: {
    flex: 3
}
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: 'black',
    borderWidth: 1,
    padding: 4,
  },
  image: {
    width: 40,
    height: 40,
    margin: 10,
    resizeMode: 'contain'
  }
});
