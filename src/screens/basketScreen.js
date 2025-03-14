// BasketScreen.js
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useBasket } from '../context/BasketContext';


// BasketItem
const BasketItem = ({ item, onIncrement, onDecrement }) => (
  <View className="flex-row p-4 border-b border-gray-800">
    <Image 
      source={typeof item.images === 'string' ? { uri: item.images } : item.images}
      className="w-24 h-36"
      style={{ resizeMode: 'contain' }}
    />

    <View className="flex-1 ml-4 justify-between">
      <View>
        <Text className="font-made-saonara text-white text-xs">{item.nom}</Text>
        <Text className="font-made-saonara text-white text-xs mt-1">{item.titre}</Text>
        <Text className="font-made-saonara text-white text-xs mt-2">{item.prix}</Text>
      </View>
      <View className="flex-row items-center mt-2">
        {/*// Decrement button*/}
        <TouchableOpacity 
          className="w-8 h-8 border border-gray-400 items-center justify-center"
          onPress={() => onDecrement(item)}
        >
          <Text className="text-white text-lg">-</Text>
        </TouchableOpacity>

        {/*// Increment button*/}

        <Text className="text-white mx-4">{item.quantity}</Text>
        <TouchableOpacity 
          className="w-8 h-8 border border-gray-400 items-center justify-center"
          onPress={() => onIncrement(item)}
        >
          <Text className="text-white text-lg">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

// BasketScreen
const BasketScreen = () => {
  const [activeTab, setActiveTab] = useState('basket');
  const navigation = useNavigation();
  const { basketItems, updateQuantity } = useBasket();

  // Total amount
  const totalAmount = basketItems.reduce((sum, item) => {
    const price = parseFloat(item.prix.split(' ')[0]);
    return sum + (price * (item.quantity || 1));
  }, 0);

  const handleIncrement = (item) => {
    updateQuantity(item.id, (item.quantity || 1) + 1);
  };

  const handleDecrement = (item) => {
    updateQuantity(item.id, (item.quantity || 1) - 1);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Close button */}
      <View className="flex-row justify-between">
        <TouchableOpacity 
          className="absolute top-5 left-5 z-10"
          onPress={() => navigation.navigate('Tabs')}// go back to previous screen
        >
          <Ionicons name="close" size={22} color="rgba(255,255,255,0.75)" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <View className="absolute top-12 left-0 right-0 px-2 z-10 bg-transparent flex-row justify-start">
        <TouchableOpacity onPress={() => setActiveTab('basket')}>
          <Text className="font-made-saonara text-white mt-20 mx-3" style={{fontSize: 12}}>
            PANIER ({basketItems.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <View className="flex-row items-center mt-20 mx-3">
            <Text className="font-made-saonara text-white mr-1" style={{fontSize: 12}}>
              FAVORIS
            </Text>
            <Ionicons name="heart-outline" size={15} color="rgba(255,255,255,0.75)" />
          </View>

        </TouchableOpacity>
      </View>

      {/* Basket items */}
      <FlatList
        data={basketItems}
        renderItem={({ item }) => (
          <BasketItem 
            item={item} 
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
        )}
        keyExtractor={item => item.id.toString()}
        className="flex-1 mt-40"
        showsVerticalScrollIndicator={false}
      />
      
      {/* Total amount */}
      {basketItems.length > 0 ? (
        <View className="p-4 border-t border-gray-800">
          <View className="flex-row justify-between mb-4">
            <Text className="font-made-saonara text-white text-xs">TOTAL</Text>
            <Text className="font-made-saonara text-white text-xs">{totalAmount.toFixed(2)} EURO</Text>
          </View>
          <TouchableOpacity className="bg-white py-4 items-center">
            <Text className="font-made-saonara text-black text-xs tracking-wider">
              PASSER LA COMMANDE
            </Text>
          </TouchableOpacity>
        </View>
      ) : (  // If the basket is empty
        <View className="mx-10 p-4 items-center justify-center flex-1">
          <Text className="font-made-saonara text-white text-sm">
            VOTRE PANIER EST VIDE
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};


export default BasketScreen;