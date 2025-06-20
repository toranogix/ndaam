// CatalogueScreen.js

import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { catalogueMan, catalogueWomen } from '../data/catalogue';

// Top categories
const topCategories = ['FEMME', 'HOMME'];

const CatalogueScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('FEMME');

  // Determine the catalogue based on the selected category
  const catalogue = selectedCategory === 'FEMME' ? catalogueWomen : catalogueMan;


  return (
    <SafeAreaView className="flex-1 bg-black">

      {/* Categories tab */}
      <View className='flex-row  items-center px-4 mt-10'>
        {topCategories.map((cat) => (
          <TouchableOpacity
          key={cat} onPress={() => setSelectedCategory(cat)}
          className='mr-4'>
          <Text className='text-white text-xm uppercase font-candy_season mt-12 ml-4'
          style={selectedCategory === cat ? {color: 'white'} : {color: 'gray'}}>
            {cat}
          </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Catalogue */}
      <ScrollView style = {{marginTop:65}} className='mt-2' showsVerticalScrollIndicator={false}>

        {catalogue.map((item) => (
          <TouchableOpacity
          key={item.id}
          onPress={() => navigation.navigate('ProductDetails', {item})}  // onpress navigate to the product details screen
          className='flex-row justify-between px-4 mb-6'>

            {/* Products ==> only the name */}
            <View>
              <Text className='text-white text-base font-light mb-2 ml-5 font-candy_season'>
                {item.nom}
              </Text>

            </View>
  
          </TouchableOpacity>
        ))}
      </ScrollView>

  </SafeAreaView>
  );
};


export default CatalogueScreen;