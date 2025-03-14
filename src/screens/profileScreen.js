// ProfileScreen.js
import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <Text className="text-white">Profil</Text>
      </View>
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