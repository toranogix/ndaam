// SearchScreen.js
// Screen for searching products

import React, { useRef } from 'react';
import { Animated, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Categories
const categories = ['FEMME', 'HOMME'];

// Recommended items
const recommendedItems = [
  {
    id: 1,
    nom: "SALY",
    prix: "75 EUR",
    titre: "Ensemble short et t-shirt",
    coupe: "Coupe droite",
    col: "Col en V",
    couleur: "Blanc et multicolore",
    tissu: "Coton premium et wax traditionnel",
    image: require('../../assets/man/collection_afro_summer/catalog_afro_summer2.png')
  },
  {
    id: 2,
    nom: "DIAMALAYE",
    prix: "75 EUR",
    titre: "Ensemble chemise et short",
    coupe: "Coupe droite",
    col: "Chemise classique avec détails en wax",
    couleur: "Blanc et multicolore",
    tissu: "Coton premium et wax traditionnel",
    image: require('../../assets/man/collection_afro_summer/catalog_diamalaye.png')
  },
  {
    id: 3,
    nom: "MEDINA",
    prix: "75 EUR",
    titre: "Ensemble short et débardeur",
    coupe: "Coupe droite",
    col: "Col rond",
    couleur: "Blanc et multicolore",
    tissu: "Wax et coton",
    image: require('../../assets/man/collection_afro_summer/catalog_medina.png')
  },
];

const SearchScreen = () => {
  // Animated value for scroll
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView className="flex-1 bg-black">
        {/* Categories tab */}
        <View className="absolute top-32 left-0 right-0 px-2 z-10 bg-transparent flex-row justify-start">
          {categories.map((cat) => (
            <TouchableOpacity key={cat} onPress={() => console.log(cat + " cliqué")}>
              <Text className="font-made-saonara text-white font-light uppercase text-sm mx-3">
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
    
            {/* ScrollView */}
        <Animated.ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
            )}
        >

            {/* SearchBar */}
            <View className="flex-row items-center border-b border-gray-600 mt-56 mx-4 pb-2">
            <Ionicons name="search-outline" size={20} color="gray" />
            <TextInput
                placeholder="QUE RECHERCHEZ-VOUS ?"
                placeholderTextColor="#666"
                className="flex-1 ml-2 text-white font-made-saonara text-center text-sm"
            />
            </View>

            {/* Recommendation section */}
            <Text className="font-made-saonara text-gray-300 text-left text-xs uppercase mt-28 mb-4 ml-4"> VOUS POURRIEZ ÊTRE INTÉRESSÉ PAR </Text>

            {/* Mapping recommended items */}
            <View className="flex-row flex-wrap justify-between px-4">
            {recommendedItems.map((item) => (
                <View key={item.id} className="w-1/2 p-2">
                <Image source={item.image} className="w-full h-72" resizeMode="cover" />
                <Text className="font-made-saonara text-white text-xs text-center mt-2 mb-1">
                    {item.nom}
                </Text>
                <Text className="font-made-saonara text-white text-xs text-center mb-1">
                    {item.titre}
                </Text>
                <Text className="font-made-saonara text-white text-xs text-center mb-1">
                    {item.prix}
                </Text>
                </View>
            ))}
            </View>
        </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
