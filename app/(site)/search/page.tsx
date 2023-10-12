"use client";
import Container from "@/components/Container";
import { searchRecipeUrl } from "@/constants";
import { fetchData } from "@/lib/utils";
import { useFavoriteContext } from "@/providers/FavoriteContextProvider";
import { parsedEnv } from "@/schemas";
import { FavoriteContextType, SearchRecipeType } from "@/types/typings";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, LucideHeart } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("query") ?? "";
  const { favorites, addFavorite, deleteFavorite, isFavorite } =
    useFavoriteContext() as FavoriteContextType;

  const nextOffset = (page: number, totalResult: number) => {
    const nextOffsetValue = page + 10 < totalResult ? page + 10 : null;
    return nextOffsetValue;
  };

  const url =
    searchRecipeUrl +
    "?query=" +
    queryParams +
    "&apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;

  const { ref, inView } = useInView();
  console.log(url);
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["search-recipe", queryParams],
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

  console.log(favorites);
  return (
    <Container>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <>
          <h1 className="text-3xl font-bold py-4 text-center">
            {data?.pages[0].totalResults} total results for &quot;{queryParams}
            &quot; found
          </h1>
          <div className="mt-8">
            {data?.pages.map((page, id) => (
              <div
                className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
                key={id}
              >
                {page.results.map((recipe: SearchRecipeType, id: number) => (
                  <div key={recipe.id}>
                    <Image
                      src={recipe.image}
                      alt={recipe.title}
                      width={200}
                      height={200}
                      layout="responsive"
                      className="rounded-lg"
                    />
                    <div className="flex justify-between py-2">
                      <p className="text-sm">
                        {recipe.title.length > 20
                          ? recipe.title.slice(0, 20) + "..."
                          : recipe.title}
                      </p>
                      <LucideHeart
                        fill={isFavorite(recipe) ? "red" : "gray"}
                        height={20}
                        width={20}
                        strokeWidth={0}
                        onClick={() => {
                          if (isFavorite(recipe)) {
                            // Item is already a favorite, so remove it
                            deleteFavorite(recipe);
                          } else {
                            // Item is not a favorite, so add it
                            addFavorite(recipe);
                          }
                        }}
                        className="animate-in transition-all duration-300 ease-in-out cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : hasNextPage ? (
              "Load Newer"
            ) : (
              "Nothing more to load"
            )}
          </button>
        </>
      )}
    </Container>
  );
}
