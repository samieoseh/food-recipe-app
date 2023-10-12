import { Dispatch, SetStateAction } from "react";

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
