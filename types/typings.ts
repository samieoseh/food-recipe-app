import { Dispatch, SetStateAction } from "react";

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

export type IngredientType = {
  id: string;
  name: string;
  image: string;
};

export type SearchRecipeType = {
  id: string;
  image: string;
  imageType?: string;
  title: string;
};

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
