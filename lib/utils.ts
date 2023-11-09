import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ERROR_MESSAGE_TITLE, supabase } from "@/constants";
import { FavoriteType } from "@/types/typings";
import { parsedEnv } from "@/schemas";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
  return url;
};

export const handleLogout = async (router: AppRouterInstance) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: error.message,
        variant: "destructive",
      });
    } else {
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
