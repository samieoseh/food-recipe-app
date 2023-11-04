"use client";
import Container from "@/components/Container";
import IngredientCard from "@/components/IngredientCard";
import MenuCard from "@/components/MenuCard";
import ProductCard from "@/components/ProductCard";
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { searchCategories } from "@/constants";
import { fetchData } from "@/lib/utils";
import { parsedEnv } from "@/schemas";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, LucideSearch } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const nextOffset = (page: number, totalResult: number) => {
    const nextOffsetValue = page + 10 < totalResult ? page + 10 : null;
    return nextOffsetValue;
  };

  const searchCategoryUrl = searchCategories[selectedCategory].url;

  const url =
    searchCategoryUrl +
    "?query=" +
    searchQuery +
    "&apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;

  const { ref, inView } = useInView();

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
      ["search-recipe", searchQuery, selectedCategory],
      async ({ pageParam = 0 }) => {
        return fetchData(url + "&offset=" + pageParam);
      },
      {
        getPreviousPageParam: (firstPage) =>
          nextOffset(firstPage.offset, firstPage.totalResults) ?? undefined,
        getNextPageParam: (lastPage) =>
          nextOffset(lastPage.offset, lastPage.totalResults) ?? undefined,
        enabled: searchQuery.length > 1,
      }
    );
  useEffect(() => {
    console.log("running use effect");
    if (inView && searchQuery.length > 1) {
      console.log("fetching");
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className="z-0">
      <div>
        {/* TODO: hero image and a search bar */}
        <div className="w-full h-64 md:h-72 relative">
          <Image
            src="/main course.jpg"
            alt="hero image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <form
          className="flex w-auto items-center justify-center relative -mt-8"
          onSubmit={(e) => {
            e.preventDefault();
            setSearchQuery(query);
          }}
        >
          <div className="w-[22rem] md:w-[32rem] h-14 lg:w-[48rem] mx-auto flex shadow-md rounded-md bg-white space-x-1 py-2 items-center relative">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-xs w-32" type="button">
                    {searchCategories[selectedCategory].category}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-48 p-2">
                      <li
                        className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                          selectedCategory === 0 && "bg-secondary rounded"
                        }`}
                        onClick={() => setSelectedCategory(0)}
                      >
                        <NavigationMenuLink className="text-xs">
                          {searchCategories[0].category}
                        </NavigationMenuLink>
                      </li>

                      <li
                        className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                          selectedCategory === 1 && "bg-secondary rounded"
                        }`}
                        onClick={() => setSelectedCategory(1)}
                      >
                        <NavigationMenuLink className="text-xs">
                          {searchCategories[1].category}
                        </NavigationMenuLink>
                      </li>
                      <li
                        className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                          selectedCategory === 2 && "bg-secondary rounded"
                        }`}
                        onClick={() => setSelectedCategory(2)}
                      >
                        <NavigationMenuLink className="text-xs">
                          {searchCategories[2].category}
                        </NavigationMenuLink>
                      </li>
                      <li
                        className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                          selectedCategory === 3 && "bg-secondary rounded"
                        }`}
                        onClick={() => setSelectedCategory(3)}
                      >
                        <NavigationMenuLink className="text-xs">
                          {searchCategories[3].category}
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <span className="h-4 w-1 bg-gray-500 rounded-lg"></span>
            <Button
              variant="link"
              type="submit"
              className="text-[#999999] p-0 mr-4 no-underline cursor-pointer absolute right-8 z-10"
            >
              <LucideSearch height={20} width={20} />
            </Button>
            <Input
              placeholder="Search..."
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              className="h-full w-full border-none outline-none rounded-none pr-16"
            />
          </div>
        </form>
      </div>
      <Container>
        {isFetching ? (
          <div className="w-full flex items-center justify-center mt-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        ) : (
          <>
            {selectedCategory === 0 && <RecipeCard data={data} />}
            {selectedCategory === 1 && <IngredientCard data={data} />}
            {selectedCategory === 2 && <ProductCard data={data} />}
            {selectedCategory === 3 && <MenuCard data={data} />}
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
