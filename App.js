import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import "./global.css"
import HomeScreen from './src/screens/homeScreen';
import SearchScreen from './src/screens/searchScreen';
import CatalogueScreen from './src/screens/catalogueScreen';
import BasketScreen from './src/screens/basketScreen';
import ProfileScreen from './src/screens/profileScreen';
import ProductDetails from './src/screens/productDetails';
import { BasketProvider } from './src/context/BasketContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/*
export default function App() {
  return <HomeScreen />;
}*/

// Function to display the tabs
function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({

          // Configure icons
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Accueil') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Recherche') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Menu') {
              iconName = focused ? 'menu' : 'menu-outline';
            } else if (route.name === 'Panier') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4C4F2C', // color green when active
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopColor: 'transparent',
          },
          headerShown: false, // hide header
        })}
      >
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Recherche" component={SearchScreen} />
        <Tab.Screen name="Menu" component={CatalogueScreen} />
        <Tab.Screen name="Panier" component={BasketScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
  );
}


export default function App() {
  return (
    <BasketProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Add stack navigator for tabs */}
        <Stack.Screen name="Tabs" component={Tabs} />
        {/* Add route for products details */}
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Basket" component={BasketScreen} />
        <Stack.Screen name="Catalogue" component={CatalogueScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </BasketProvider>
  );
}