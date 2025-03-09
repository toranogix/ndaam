// CatalogueScreen.js
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const CatalogueScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Menu</Text>
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

export default CatalogueScreen;