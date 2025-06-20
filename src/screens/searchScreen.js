// SearchScreen.js
// Screen for searching products

import React, { useRef, useState } from 'react';
import { Animated, View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import {MagnifyingGlassIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { useBasket } from '../context/BasketContext';
import { recommendedMenItems, recommendedWomenItems } from './recommendItems';


// Categories
const categories = ['FEMME', 'HOMME'];

const SearchScreen = () => {
  // Animated value for scroll
  const scrollY = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation();
  const { addToBasket, basketItems } = useBasket();

  // Track the selected category
  const [selectedCategory, setSelectedCategory] = useState('FEMME');

  // Determine the recommended items based on the selected category
  const recommendedItems =
    selectedCategory === 'FEMME' ? recommendedWomenItems : recommendedMenItems;

  const handleAddToBasket = (item) => {
    const basketItem = {
      id: item.id,
      nom: item.nom,
      prix: item.prix,
      titre: item.titre,
      images: item.image
    };
    
    addToBasket(basketItem);
    
    console.log('Ajouté au panier:', item.nom);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
        {/* Categories tab */}
        <View className="absolute top-28 left-0 right-0 px-2 z-10 bg-transparent flex-row justify-start">
          {categories.map((cat) => (
            
            <TouchableOpacity key={cat} onPress={() => setSelectedCategory(cat)}>
              <Text className = "font-candy_season text-white text-xs uppercase mt-7 mr-4 ml-4"
                style = {
                selectedCategory === cat ? { color: 'white'} : { color: 'gray' } // change the color of the selected category
              }>
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
                className="flex-1 ml-2 text-white font-candy_season text-center text-sm"
            />
            </View>

            {/* Recommendation section */}
            <Text className="font-candy_season text-gray-300 text-left text-xs uppercase mt-28 mb-4 ml-4"> VOUS POURRIEZ ÊTRE INTÉRESSÉ PAR </Text>

            {/* Mapping recommended items */}
            <View className="flex-row flex-wrap justify-between px-4">
              {recommendedItems.map((item) => (
                <View key={item.id} className="w-1/2 p-2">
                  <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', {item})}>
                    <View className="relative">
                      <Image source={item.images.img1} className="w-full h-72" resizeMode="cover" />
                      <TouchableOpacity 
                        className="absolute bottom-2 right-2"
                        onPress={() => handleAddToBasket(item)}  // add to basket
                      >
                        {/* Cart icon */}
                        <View className="flex-row items-center bg-white rounded-full px-3 py-2">
                          <Ionicons 
                            name="cart" 
                            size={15} 
                            color="black"
                          />

                          {/* Show the quantity of the item in the basket */}
                          {basketItems.find(i => i.id === item.id) && (
                            <Text className="ml-1 text-black text-xs">
                              {basketItems.find(i => i.id === item.id).quantity}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                    <Text className="font-candy_season text-white text-xs text-center mt-2 mb-1">
                      {item.nom}
                    </Text>
                    <Text className="font-candy_season text-white text-xs text-center mb-1">
                      {item.prix}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
              
            </View>
        </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
