"use client";
import Container from "@/components/Container";
import IngredientCard from "@/components/IngredientCard";
import MenuCard from "@/components/MenuCard";
import ProductCard from "@/components/ProductCard";
import RecipeCard from "@/components/RecipeCard";
import { categoryKeys, searchCategories } from "@/constants";
import { fetchData } from "@/lib/utils";
import { parsedEnv } from "@/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, LucideSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function SearchPage({ params }: { params: { type: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCategoryUrl = searchCategories.get(params.type);
  const [selectedCategory, setSelectedCategory] = useState(params.type);
  const query = searchParams.get("query") ?? "";
  const [searchInput, setSearchInput] = useState(
    searchParams.get("query") ?? ""
  );

  const url = searchCategoryUrl + "?query=" + query;

  const { ref, inView } = useInView();

  const nextOffset = (page: number, totalResult: number) => {
    const nextOffsetValue = page + 10 < totalResult ? page + 10 : null;
    return nextOffsetValue;
  };

  const {
    data,
    isInitialLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["search-recipe", query, searchCategoryUrl],
    async ({ pageParam = 0 }) => {
      return fetchData(url + "&offset=" + pageParam);
    },
    {
      getPreviousPageParam: (firstPage) =>
        nextOffset(firstPage.offset, firstPage.totalResults) ?? undefined,
      getNextPageParam: (lastPage) =>
        nextOffset(lastPage.offset, lastPage.totalResults) ?? undefined,
      enabled: query.length > 1,
    }
  );
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  console.log(isInitialLoading, data, searchInput);
  return (
    <div className="z-0">
      <div>
        <SearchBar
          links={true}
          searchInput={searchInput}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          height={11}
        />
      </div>
      <Container>
        {isInitialLoading ? (
          <div className="w-full flex items-center justify-center mt-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          <>
            {params.type === categoryKeys[0] && <RecipeCard data={data} />}
            {params.type === categoryKeys[1] && <IngredientCard data={data} />}
            {params.type === categoryKeys[2] && <ProductCard data={data} />}
            {params.type === categoryKeys[3] && <MenuCard data={data} />}
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
    </div>
  );
}
