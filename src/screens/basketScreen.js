
// BasketScreen.js
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const BasketScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Panier</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
});

export default BasketScreen;