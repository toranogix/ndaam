

import React from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';
import { useBasket } from '../context/BasketContext';

const FavoriteItem = ({ item }) => {
    const navigation = useNavigation();
    const { removeFromFavorites } = useFavorites();
    const { addToBasket } = useBasket();

    // we take the first image from the images object
    const imageUrl = typeof item.images === 'object' && Object.values(item.images).length > 0
        ? Object.values(item.images)[0]
        : item.images;

    // we add the item to the basket
    const handleAddToBasket = () => {
        const basketItem = {
            id: item.id,
            nom: item.nom,
            prix: item.prix,
            titre: item.titre,
            images: imageUrl // we use the extracted image URL to avoid errors
        };
        
        addToBasket(basketItem);
        console.log('Ajouté au panier depuis favoris:', item.nom);
    };

    return (
        <TouchableOpacity 
            className="flex-row items-center bg-black rounded-2xl border-b border-gray-800 p-4 mb-4 shadow-sm"
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetails', { item })}
        >
            <Image 
                source={imageUrl}
                className="w-24 h-36" 
                style={{ resizeMode: 'cover' }}
            />
            <View className="flex-1 ml-4">
                <Text className="font-candy_season text-white text-sm">{item.nom}</Text>
                <Text className="font-candy_season text-white text-xs mt-1">{item.titre}</Text>
                <Text className="font-candy_season text-white text-sm mt-2">{item.prix}</Text>
            </View>
            <View className="flex-col items-center">
                <TouchableOpacity onPress={() => removeFromFavorites(item.id)} className="p-2">
                    <Ionicons name="heart" size={24} color="#EF4444" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={handleAddToBasket} 
                    className="p-2 mt-2 bg-white rounded-full"
                >
                    <Ionicons name="add" size={20} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

// FavoritesScreen ==> fenetre des favoris
const FavoritesScreen = () => {
  const navigation = useNavigation();
  const { favoriteItems } = useFavorites();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        {/* Header */}
        <View className="flex-row items-center justify-between p-4">
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
                <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity> 
            <Text className="font-candy_season text-lg text-white">Favoris</Text>
            <View style={{ width: 40 }} />
        </View>

        {/* Favorites List */}
        {favoriteItems.length > 0 ? (
            <FlatList
                data={favoriteItems}
                renderItem={({ item }) => <FavoriteItem item={item} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ padding: 16 }}
            />
        ) : (
            <View className="flex-1 items-center justify-center">
                <Ionicons name="heart-outline" size={60} color="#D1D5DB" />
                <Text className="font-candy_season text-white text-base mt-4">Votre liste de favoris est vide</Text>
                <Text className="font-candy_season text-white text-sm text-center mt-2 mx-8">
                    Appuyez sur l'icône cœur sur un produit pour l'ajouter ici.
                </Text>
            </View>
        )}
    </SafeAreaView>
  );
};

export default FavoritesScreen; 