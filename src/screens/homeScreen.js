// Date: 03/07/2021
// Description: Home screen for the app

import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Acceuil</Text>
    </View>
  );
};


// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Ajout de la couleur de fond
  },

  text: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },

});

export default HomeScreen;
