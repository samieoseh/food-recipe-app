"use client";
import {
  ChildrenProps,
  SearchContext,
  SearchRecipeType,
} from "@/types/typings";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext<SearchContext>({
  searchResult: [],
  clearSearchResult: () => {
    console.log("hi");
    return 5;
  },
  setSearchResult: () => {},
});

export const useSearchContext = () => {
  return useContext(SearchContext);
};

export default function SearchResultProvider({ children }: ChildrenProps) {
  const [searchResult, setSearchResult] = useState<SearchRecipeType[]>([]);

  const clearSearchResult = () => {
    console.log("clearing");
    console.log(searchResult);
    setSearchResult([]);
  };

  return (
    <SearchContext.Provider
      value={{ searchResult, clearSearchResult, setSearchResult }}
    >
      {children}
    </SearchContext.Provider>
  );
}
