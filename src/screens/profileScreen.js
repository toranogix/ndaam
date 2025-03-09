// ProfileScreen.js
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profil</Text>
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

export default ProfileScreen;