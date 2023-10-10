"use client";
import Container from "@/components/Container";
import { searchRecipeUrl } from "@/constants";
import { fetchData } from "@/lib/utils";
import { parsedEnv } from "@/schemas";
import { SearchRecipeType } from "@/types/typings";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LucideHeart } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchContext } from "@/providers/SearchResultProvider";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const queryParams = searchParams.get("query") ?? "";
  const offsetParam = searchParams.get("offset") ?? "";
  const [offset, setOffset] = useState(Number(offsetParam));
  const [hasMore, setHasMore] = useState(true);
  const { searchResult, setSearchResult } = useSearchContext();
  console.log(searchResult);
  console.log(offset);

  const url =
    searchRecipeUrl +
    "?query=" +
    queryParams +
    "&offset=" +
    offset +
    "&apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;

  console.log(url);
  const { data, isLoading } = useQuery({
    queryKey: ["search-recipe", queryParams, offset],
    queryFn: async () => fetchData(url),
  });

  useEffect(() => {
    if (data) {
      const newResults = data.results;
      setSearchResult((prevResults) => [...prevResults, ...newResults]);

      if (newResults.length < 10) {
        setHasMore(false);
      }
    }
  }, [data, setSearchResult]);

  const loadMore = () => {
    if (!isLoading) {
      setOffset(offset + 10); // Increase the offset to fetch the next page
    }
  };

  return (
    <Container>
      <h1>Hello Search Page</h1>
      <div>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 w-full">
            <InfiniteScroll
              dataLength={data.totalResults}
              next={loadMore}
              hasMore={hasMore}
              loader={<Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              endMessage={<p>No more data to load.</p>}
            >
              {searchResult.length >= 0 ? (
                searchResult.map((recipe: SearchRecipeType, id: number) => (
                  <div key={id}>
                    <div className="relative h-[200px] w-[300px] rounded-lg overflow-hidden">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </div>
                    <div className="flex justify-between py-2">
                      <p>{recipe.title}</p>
                      <LucideHeart fill="gray" height={20} width={20} />
                    </div>
                  </div>
                ))
              ) : (
                <h1>No results found</h1>
              )}
            </InfiniteScroll>
          </div>
        )}
      </div>
    </Container>
  );
}
