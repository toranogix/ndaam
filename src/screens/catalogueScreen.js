// CatalogueScreen.js
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const CatalogueScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View className='flex-1 bg-black  text-white'>
        <Text> Menu </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'black'
  },
});

export default CatalogueScreen;