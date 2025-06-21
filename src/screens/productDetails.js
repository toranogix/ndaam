// Product details screen

import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFavorites } from '../context/FavoritesContext';

const ProductDetails = ({ route, navigation }) => {
  const { item } = route.params;
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const favorite = isFavorite(item.id);

  const handleToggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-row justify-between items-center px-4 pt-2">
        {/* Close button */}
        <TouchableOpacity
          className="p-2"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color="rgba(255,255,255,0.75)" />
        </TouchableOpacity>

        <View className="flex-row">
          {/* Add to favorites button */}
          <TouchableOpacity
            className="p-2"
            onPress={handleToggleFavorite}
          >
            <Ionicons name={favorite ? "heart" : "heart-outline"} size={24} color={favorite ? "#EF4444" : "rgba(255,255,255,0.75)"} />
          </TouchableOpacity>
          {/* Share button */}
          <TouchableOpacity
            className="p-2"
            onPress={() => console.log('Produit partagé')}
          >
            <Ionicons name="share-social" size={24} color="rgba(255,255,255,0.75)" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Product image */}
        <View className="flex-1 mt-12 justify-center items-center">
          {typeof item.images === 'object' ? (

            // If multiple images
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>
              {Object.values(item.images).map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  style={{ width: 385, height: 550, marginRight: 5, marginLeft: 5 }}
                  resizeMode="contain"
                />
              ))}
            </ScrollView>
          ) : (  // If single image
            <Image
              source={item.images}
              style={{ width: 400, height: 550, marginRight: 5, marginLeft: 5 }}
              resizeMode = "contain"
            />
          )}
        </View>

        {/* Product details */}
        <View className="px-4 mt-6">
          <Text className="text-white text-xs mb-1 font-candy_season">
            {item.couleur || 'Noir'} | {item.nom}
          </Text>
          <Text className="text-white text-base font-bold mb-2 font-candy_season">
            {item.titre?.toUpperCase()}
          </Text>
          <Text className="text-white text-xs mb-2 font-candy_season">
            {item.prix}
          </Text>

          {/* Description */}
          <Text className="text-white text-xs mb-5 leading-5">
            Coupe: {item.coupe}{"\n"}
            Col: {item.col}{"\n"}
            Tissu: {item.tissu}
            {"\n\n"}
          </Text>

          {/* Ajouter button */}
          <TouchableOpacity
            className="bg-transparent py-3 items-center justify-center mt-20 border border-gray-400"
            onPress={() => console.log(item.nom + " ajouté au panier")} // add to cart
          >
            <View className="flex-row items-center">
              <Ionicons name="cart" size={20} color="white" />
              <Text className="text-gray-300 text-sm font-bold ml-2 font-candy_season">Ajouter</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;
