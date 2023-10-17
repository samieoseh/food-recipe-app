"use client";
import Container from "@/components/Container";
import IngredientCard from "@/components/IngredientCard";
import MenuCard from "@/components/MenuCard";
import ProductCard from "@/components/ProductCard";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { searchCategories, searchRecipeUrl } from "@/constants";
import { fetchData } from "@/lib/utils";
import { useAppContext } from "@/providers/AppContextProvider";
import { parsedEnv } from "@/schemas";
import { AppContextType, SearchRecipeType } from "@/types/typings";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, LucideHeart } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("query") ?? "";
  const { category, setCategory } = useAppContext() as AppContextType;
  const nextOffset = (page: number, totalResult: number) => {
    const nextOffsetValue = page + 10 < totalResult ? page + 10 : null;
    return nextOffsetValue;
  };

  const searchCategoryUrl = searchCategories[category].url;

  const url =
    searchCategoryUrl +
    "?query=" +
    queryParams +
    "&apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;

  const { ref, inView } = useInView();
  console.log(url);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["search-recipe", queryParams, category],
      async ({ pageParam = 0 }) => {
        console.log(pageParam);
        return fetchData(url + "&offset=" + pageParam);
      },
      {
        getPreviousPageParam: (firstPage) =>
          nextOffset(firstPage.offset, firstPage.totalResults) ?? undefined,
        getNextPageParam: (lastPage) =>
          nextOffset(lastPage.offset, lastPage.totalResults) ?? undefined,
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(data, category);
  return (
    <Container>
      <div className="mt-8 mb-4 flex items-center justify-center flex-wrap space-x-2">
        {searchCategories.map((item, id) => (
          <Button
            key={id}
            variant="link"
            className={`font-bold hover:no-underline focus:no-underline hover:bg-secondary focus:bg-secondary m-1 ${
              category === id ? "bg-secondary" : ""
            }`}
            onClick={() => setCategory(id)}
          >
            {item.category}
          </Button>
        ))}
      </div>
      {isLoading ? (
        <div className="w-full flex items-center justify-center mt-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <>
          {category === 0 && <RecipeCard data={data} />}
          {category === 1 && <IngredientCard data={data} />}
          {category === 2 && <ProductCard data={data} />}
          {category === 3 && <MenuCard data={data} />}
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage && (
              <div className="w-full border flex items-center justify-center mt-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </div>
            )}
          </button>
        </>
      )}
    </Container>
  );
}
