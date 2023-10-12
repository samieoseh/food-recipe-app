"use client";

import {
  ChildrenProps,
  FavoriteContextType,
  SearchRecipeType,
} from "@/types/typings";
import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};

export default function FavoriteContextProvider({ children }: ChildrenProps) {
  const [favorites, setFavorites] = useState<SearchRecipeType[]>([]);

  const addFavorite = (favorite: SearchRecipeType) => {
    console.log("working");
    setFavorites([...favorites, favorite]);
  };

  const deleteFavorite = (favorite: SearchRecipeType) => {
    setFavorites(favorites.filter((item) => item.id != favorite.id));
  };

  const isFavorite = (favorite: SearchRecipeType) => {
    return favorites.some((item) => item.id === favorite.id);
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, deleteFavorite, isFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
