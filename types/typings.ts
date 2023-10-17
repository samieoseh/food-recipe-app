import { ConnectedUserSchema, RecipeUserSchema } from "@/schemas";
import { Dispatch, SetStateAction } from "react";
import * as z from "zod";

export type Page = {
  number: number;
  offset: number;
  results: [];
  totalResults: number;
};

export type RecipePage = Omit<Page, "results"> & {
  results: SearchRecipeType[];
};

export type IngredientPage = Omit<Page, "results"> & {
  results: IngredientType[];
};

export type ProductPage = Omit<Page, "results"> & {
  products: SearchRecipeType[];
  processingTimeMs: number;
  type: string;
};

export type MenuPage = Omit<ProductPage, "products"> & {
  menuItems: SearchRecipeType[];
};

export type SearchRecipeType = {
  id: string;
  image: string;
  imageType?: string;
  title: string;
};
export type IngredientType = {
  id: string;
  name: string;
  image: string;
};

export type ProductType = SearchRecipeType & {
  restuarantChain: string;
  servings: {
    number: number;
    size: number | undefined;
    unit: number | undefined;
  };
};
export type MenuType = SearchRecipeType;

export type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
};

export type AppContextType = {
  favorites: (SearchRecipeType | IngredientType)[];
  category: number;
  setCategory: Dispatch<SetStateAction<number>>;
  addFavorite: (favorite: SearchRecipeType | IngredientType) => void;
  deleteFavorite: (favorite: SearchRecipeType | IngredientType) => void;
  isFavorite: (favorite: SearchRecipeType | IngredientType) => boolean;
};

export type RecipeUser = z.infer<typeof RecipeUserSchema>;
export type RecipeUsers = RecipeUser[];
export type ConnectedUser = z.infer<typeof ConnectedUserSchema>;
