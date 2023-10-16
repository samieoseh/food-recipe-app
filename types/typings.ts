import { ConnectedUserSchema, RecipeUserSchema } from "@/schemas";
import * as z from "zod";

export type SearchRecipeType = {
  id: string;
  image: string;
  imageType: string;
  title: string;
};

export type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
};

export type FavoriteContextType = {
  favorites: SearchRecipeType[];
  addFavorite: (favorite: SearchRecipeType) => void;
  deleteFavorite: (favorite: SearchRecipeType) => void;
  isFavorite: (favorite: SearchRecipeType) => boolean;
};

export type RecipeUser = z.infer<typeof RecipeUserSchema>;
export type RecipeUsers = RecipeUser[];
export type ConnectedUser = z.infer<typeof ConnectedUserSchema>;
