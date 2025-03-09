// HomeScreen.js
// Description: Home screen for the app

import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ImageBackground, StyleSheet, Text, Animated, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from "../../assets/texte_logo_ndam.png";
import imageBackground1 from "../../assets/image_homescreen.png";
import imageBackground2 from "../../assets/image_homescreen2.png";

const HomeScreen = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [imageBackground1, imageBackground2];

  // Vertical transition
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      translateY.setValue(-300); // 300 ==> height of the container

      // Update the image
      setCurrentImage(prevImage => (prevImage + 1) % images.length);

      // Animation
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, 10000);

    return () => clearInterval(interval);
  }, [translateY]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1 }}>
        {/* Logo overlay with transparency */}
        <Image source={logo} style={styles.logoOverlay} resizeMode="contain" />

        {/* Content scrollable */}
        <ScrollView
          contentContainerStyle={{ alignItems: 'center', paddingTop: 140 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Texts */}
          <Text className="font-made-saonara text-4xl text-gray-800 font-semibold"> COLLECTION</Text>
          <Text className="font-made-saonara text-sm mb-12 text-gray-600">L'ELEGANCE AFRICAINE REINVENTEE</Text>

          {/* Images */}
          <View style={styles.imageContainer}>
            <Animated.View style={[styles.animatedContainer, { transform: [{ translateY }] }]}>
              <ImageBackground 
                source={images[currentImage]} 
                style={styles.backgroundImage}
              />
            </Animated.View>
          </View>

          {/* History of NDAAM */}
          <View className="w-full px-4 py-8 bg-white mt-40">
            <Text className="font-made-saonara text-xl text-gray-800 font-semibold mt-12 text-center">
              Notre Histoire
            </Text>
            <Text className="font-made-saonara text-sm text-black-600 text-center mt-4">
              NDAAM est bien plus qu'une marque de mode : c'est une rencontre entre héritage et modernité, une célébration du savoir-faire africain revisité pour une élégance intemporelle.
            </Text>
            <Text className="font-made-saonara text-sm text-black-600 text-center mt-2">
              Inspirée des traditions artisanales du continent, NDAAM crée des pièces uniques qui mêlent techniques ancestrales et design contemporain. Chaque collection est une invitation à découvrir l'histoire et la richesse culturelle de l'Afrique, à travers des créations qui allient authenticité et innovations contemporaines.
            </Text>
            <Text className="font-made-saonara text-sm text-black-600 text-center mt-2">
              Chaque création porte en elle une histoire, un fragment d'identité qui transcende les tendances pour offrir un style authentique et affirmé.
            </Text>
            <Text className="font-made-saonara text-sm text-black-600 text-center mt-2">
              Son nom vient du village de NDAAM LO, en plein coeur du Sénégal dans la région de Thiès, un lieu chargé de sens qui incarne les valeurs de la marque : transmission, excellence et fierté culturelle.
            </Text>
            <Text className="font-made-saonara text-sm text-black-600 text-center mt-2">
              Chez NDAAM, nous croyons que la mode doit avoir du sens. C'est pourquoi nous avons fait le choix d'une production sur mesure qui limite le gaspillage et valorise une consommation plus réfléchie.
            </Text>
          </View>

          {/* Copyrights */}
          <View style={styles.copyRights}>
            <Text className="font-made-saonara text-xs text-black-600 mt-20">© 2025 NDAAM. Tous droits réservés.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  logoOverlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    width: '100%',
    height: 70, 
    opacity: 0.7, 
    zIndex: 20,
  },
  imageContainer: {
    width: 288,
    height: 400,
    borderWidth: 0.25,
    borderColor: '#E5E7EB',
    borderRadius: 0.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2.65,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  animatedContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  copyRights: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
