"use client";

import { supabase } from "@/constants";
import useAuth from "@/hooks/useAuth";
import { getFavoritesFromDB } from "@/lib/utils";
import {
  ChildrenProps,
  AppContextType,
  FavoriteType,
  RecipeUser,
} from "@/types/typings";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export default function AppContextProvider({ children }: ChildrenProps) {
  const [category, setCategory] = useState(0);
  const { getCurrentUser } = useAuth();

  const [favorites, setFavorites] = useState<FavoriteType[]>([]);

  const addFavorite = async (favorite: FavoriteType) => {
    const user = await getCurrentUser();
    console.log(favorite);
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email)
        .returns<RecipeUser[]>();

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        const { error } = await supabase.from("Favorites").insert([
          {
            item_id: favorite.item_id,
            category: favorite.category,
            user_id: data[0].id,
          },
        ]);

        if (error) {
          console.error(error);
          return;
        }

        // set the favorite context
        setFavorites([...favorites, favorite]);
        console.log("Added favorite", favorite);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async (favorite: FavoriteType) => {
    const { error } = await supabase
      .from("Favorites")
      .delete()
      .eq("item_id", favorite.item_id);

    if (error) {
      console.error(error);
      return;
    }
    setFavorites(favorites.filter((item) => item.item_id != favorite.item_id));
  };

  const isFavorite = (favorite: FavoriteType) => {
    return favorites.some((item) => item.item_id === favorite.item_id);
  };

  useEffect(() => {
    getFavoritesFromDB()
      .then((fav) => setFavorites(fav))
      .catch((error) => console.error(error));
  }, []);

  console.log(favorites);
  return (
    <AppContext.Provider
      value={{
        favorites,
        category,
        addFavorite,
        deleteFavorite,
        isFavorite,
        setCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
