import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, Platform, TouchableOpacity, Text, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Font from 'expo-font';
import "./global.css"
import HomeScreen from './src/screens/homeScreen';
import SearchScreen from './src/screens/searchScreen';
import CatalogueScreen from './src/screens/catalogueScreen';
import BasketScreen from './src/screens/basketScreen';
import ProfileScreen from './src/screens/profileScreen';
import ProductDetails from './src/screens/productDetails';
import { BasketProvider, useBasket } from './src/context/BasketContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import FavoritesScreen from './src/screens/favoritesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Test with liquid glass effect ios 25 
// Animated tab bar
const CustomTabBar = ({ state, descriptors, navigation, basketCount }) => {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  // Get route name to determine which colors to use for the tab bar
  const currentRoute = state.routes[state.index].name;
  
  // Define colors based on current page
  const getColorsForRoute = (routeName) => {
    switch (routeName) {
      case 'Accueil':
      case 'Profil':
        // if White background ===> we use dark colors for visibility
        return {
          blurIntensity: 30,
          gradientColors: ['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.08)', 'rgba(0,0,0,0.03)'],
          activeGradientColors: ['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.15)', 'rgba(0,0,0,0.05)'],
          iconColor: '#000000',
          iconActiveColor: '#000000',
          iconInactiveColor: 'rgba(0,0,0,0.6)',
          containerStyle: { backgroundColor: 'rgba(255,255,255,0.9)' }
        };
      case 'Recherche':
      case 'Menu':
      case 'Panier':
        // if Dark background ===> we use light colors
        return {
          blurIntensity: 25,
          gradientColors: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)'],
          activeGradientColors: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)'],
          iconColor: '#FFFFFF',
          iconActiveColor: '#FFFFFF',
          iconInactiveColor: 'rgba(255,255,255,0.7)',
          containerStyle: { backgroundColor: 'rgba(0,0,0,0.8)' }
        };

      // if no color is defined, we use the default colors
      default:
        return {
          blurIntensity: 25,
          gradientColors: ['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)'],
          activeGradientColors: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)'],
          iconColor: '#FFFFFF',
          iconActiveColor: '#FFFFFF',
          iconInactiveColor: 'rgba(255,255,255,0.7)',
          containerStyle: { backgroundColor: 'rgba(0,0,0,0.8)' }
        };
    }
  };

  const colors = getColorsForRoute(currentRoute);

  useEffect(() => {
    // Animate the active tab
    animatedValues.forEach((animValue, index) => {
      Animated.spring(animValue, {
        toValue: state.index === index ? 1 : 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      {/* Liquid Glass Background */}
      <BlurView intensity={colors.blurIntensity} style={[styles.blurContainer, colors.containerStyle]}>
        <LinearGradient
          colors={colors.gradientColors}
          style={styles.gradientBackground}
        />
      </BlurView>
      
      {/* Tab Items */}
      <View style={styles.tabItemsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const scale = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
          });

          const opacity = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1],
          });

          const translateY = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -8],
          });

          const isCart = route.name === 'Panier';
          const cartItemCount = basketCount;

          return (
            <View key={route.key} style={styles.tabItem}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                {/* Active Tab Indicator with Animation */}
                {isFocused && (
                  <Animated.View 
                    style={[
                      styles.activeIndicator,
                      {
                        opacity: animatedValues[index],
                        transform: [{ scale: animatedValues[index] }]
                      }
                    ]}
                  >
                    <LinearGradient
                      colors={colors.activeGradientColors}
                      style={styles.activeGradient}
                    />
                  </Animated.View>
                )}
                
                {/* Icon with Animation */}
                <Animated.View 
                  style={[
                    styles.iconContainer,
                    {
                      transform: [{ scale }, { translateY }],
                      opacity
                    }
                  ]}
                >
                  {options.tabBarIcon({ 
                    focused: isFocused, 
                    color: isFocused ? colors.iconActiveColor : colors.iconInactiveColor, 
                    size: 20 
                  })}
                  {isCart && cartItemCount > 0 && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{cartItemCount}</Text>
                    </View>
                  )}
                </Animated.View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

// Function to display the tabs
function Tabs() {
  const { basketItems } = useBasket();

  // Calculate the total number of items by summing their quantities
  const totalItemCount = basketItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} basketCount={totalItemCount} />}
      screenOptions={({ route }) => ({
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
        headerShown: false,
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

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
    marginHorizontal: 16,
    marginBottom: 8,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 30,
  },
  tabItemsContainer: {
    flexDirection: 'row',
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    minHeight: 60,
    minWidth: 60,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
    overflow: 'hidden',
  },
  activeGradient: {
    flex: 1,
    borderRadius: 30,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 20,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF3B30', // iOS red color
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'candy_season': require('./assets/font/candy_season.otf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
        setFontsLoaded(true); // Continue without custom font
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
        <Text style={{ color: 'white', fontSize: 16 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <FavoritesProvider>
      <BasketProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
            <Stack.Screen name="Basket" component={BasketScreen} />
            <Stack.Screen name="Catalogue" component={CatalogueScreen} />
            <Stack.Screen name="Favorites" component={FavoritesScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </BasketProvider>
    </FavoritesProvider>
  );
}