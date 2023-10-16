"use client";

import {
  ChildrenProps,
  AppContextType,
  SearchRecipeType,
  IngredientType,
} from "@/types/typings";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({ children }: ChildrenProps) {
  const [favorites, setFavorites] = useState<
    (SearchRecipeType | IngredientType)[]
  >([]);
  const [category, setCategory] = useState(0);

  const addFavorite = (favorite: SearchRecipeType | IngredientType) => {
    setFavorites([...favorites, favorite]);
  };

  const deleteFavorite = (favorite: SearchRecipeType | IngredientType) => {
    setFavorites(favorites.filter((item) => item.id != favorite.id));
  };

  const isFavorite = (favorite: SearchRecipeType | IngredientType) => {
    return favorites.some((item) => item.id === favorite.id);
  };

  return (
    <AppContext.Provider
      value={{
        favorites,
        category,
        setCategory,
        addFavorite,
        deleteFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
