import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { supabase } from "@/constants";
import { FavoriteType } from "@/types/typings";
import { parsedEnv } from "@/schemas";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchData = async (url: string) => {
  console.log(url);
  const data = await fetch(
    url + "&apiKey=" + parsedEnv.NEXT_PUBLIC_SPONNACULAR_API
  );
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
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("error happened", error);
    }

    if (data) {
      const { data, error } = await supabase
        .from("Favorites")
        .select("item_id, category, title, image")
        .returns<FavoriteType[]>();

      if (error) {
        console.error("error while accessing data", error);
      }
      return data ?? [];
    }

    console.log(data);
  } catch (error) {
    console.error("error occured", error);
  }

  return [];
};

export const getUrl = () => {
  let url = process?.env?.NEXT_PUBLIC_VERCEL_URL ?? "http://localhost:3000/";
  url = url.includes("http") ? url : `https://${url}`;
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  console.log(url);
  return url + "auth/callback";
};
