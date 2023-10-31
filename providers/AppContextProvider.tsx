"use client";

import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/constants";
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

  const [favorites, setFavorites] = useState<FavoriteType[]>([]);

  const addFavorite = async (favorite: FavoriteType) => {
    try {
      const { error } = await supabase.from("Favorites").insert([
        {
          item_id: favorite.item_id,
          category: favorite.category,
          image: favorite.image,
          title: favorite.title,
        },
      ]);

      if (error) {
        console.error(error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "An error occurred when adding to favorites.",
          variant: "destructive",
        });
        return;
      }

      // set the favorite context
      setFavorites([...favorites, favorite]);
      console.log("Added favorite", favorite);

      toast({
        title: "Added to Favorites",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "An error occurred when adding to favorites.",
        variant: "destructive",
      });
    }
  };

  const deleteFavorite = async (favorite: FavoriteType) => {
    try {
      const { error } = await supabase
        .from("Favorites")
        .delete()
        .eq("item_id", favorite.item_id);

      if (error) {
        console.error(error);
        toast({
          title: "Uh oh! Something went wrong.",
          description: "An error occurred when deleting from favorites.",
          variant: "destructive",
        });
        return;
      }

      setFavorites(
        favorites.filter((item) => item.item_id != favorite.item_id)
      );

      toast({
        title: "Removed from Favorites",
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Uh oh! Something went wrong.",
        description: "An error occurred when adding to favorites.",
        variant: "destructive",
      });
    }
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
