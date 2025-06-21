import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToFavorites = (item) => {
    setFavoriteItems(currentItems => {
      // Avoid adding duplicates
      if (currentItems.find(i => i.id === item.id)) {
        return currentItems;
      }
      return [...currentItems, item];
    });
  };

  const removeFromFavorites = (itemId) => {
    setFavoriteItems(currentItems => 
      currentItems.filter(item => item.id !== itemId)
    );
  };

  const isFavorite = (itemId) => {
    return favoriteItems.some(item => item.id === itemId);
  };

  return (
    <FavoritesContext.Provider value={{
      favoriteItems,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites doit être utilisé dans un FavoritesProvider');
  }
  return context;
}; 