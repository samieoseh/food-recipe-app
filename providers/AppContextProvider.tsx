"use client";

import { toast } from "@/components/ui/use-toast";
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
    try {
      const user = await getCurrentUser();
      const { data } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email)
        .returns<RecipeUser[]>();

      if (data) {
        await supabase.from("Favorites").insert([
          {
            item_id: favorite.item_id,
            category: favorite.category,
            user_id: data[0].id,
            image: favorite.image,
            title: favorite.title,
          },
        ]);
        // set the favorite context
        setFavorites([...favorites, favorite]);
        console.log("Added favorite", favorite);
      }

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
      await supabase.from("Favorites").delete().eq("item_id", favorite.item_id);

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
