import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { supabase } from "@/constants";
import { FavoriteType } from "@/types/typings";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string) => {
  const data = await fetch(url);
  return data.json();
};

export const handleSearchSubmit = (
  router: AppRouterInstance,
  query: string
) => {
  const url = "/search?query=" + query;
  router.push(url);
};

export const getFavoritesFromDB = async () => {
  const { data, error } = await supabase
    .from("Favorites")
    .select("item_id, category, title, image")
    .returns<FavoriteType[]>();

  if (error) {
    console.error(error);
  }
  return data ?? [];
};
