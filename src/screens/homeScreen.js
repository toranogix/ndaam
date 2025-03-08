// Date: 03/07/2021
// Description: Home screen for the app

import React from 'react';
import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={"./assets/texte_logo_ndam.png"} style={styles.logoNdam}/>
      <Text style={styles.textHome2}>COLLECTION</Text>
      <Text style={styles.textHome2}>L'ELEGANCE AFRICAINE REINVENTEE</Text>


    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', 
  },

  logoNdam: {
    width: 50,
    height: 50,
    backgroundColor: 'rgba(0,0,0,0.2)',
    resizeMode: 20,
  },

  textHome1: {
    fontFamily: 'Trebuchet MS',
    fontSize: 100,
    fontWeight: '900', // Extra bold
    color: '#4C4F2C',
  },

  textHome2: {
    fontFamily: 'Trebuchet MS',
    fontSize: 15,
    fontWeight: '900', // Extra bold
    color: '#4C4F2C',
  },

});

export default HomeScreen;
