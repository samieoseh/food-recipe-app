"use client";
import Container from "@/components/Container";
import {
  categoryKeys,
  cuisines,
  recipesCategories,
  searchCategories,
  trendingRecipesUrl,
} from "@/constants";
import { fetchData } from "@/lib/utils";
import { parsedEnv } from "@/schemas";
import { RecipeInformation } from "@/types/typings";
import { useQueries } from "@tanstack/react-query";
import { Loader2, LucideSearch, LucideTimer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/SearchBar";

export default function DashboardPage() {
  const [selectedCuisine, setSelectedCuisine] = useState("African");
  const [selectedCategory, setSelectedCategory] = useState(categoryKeys[0]);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const url =
    trendingRecipesUrl +
    "?apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API +
    "&number=100";

  const results = useQueries({
    queries: [
      { queryKey: ["trending"], queryFn: () => fetchData(url) },
      {
        queryKey: ["cuisines", selectedCuisine],
        queryFn: () =>
          fetchData(url + "&tags=," + selectedCuisine.toLowerCase()),
      },
    ],
  });

  const cuisineSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <div className="bg-gradient-to-b from-[#fff]  via-[#f9ebe9]  to-[#fff] py-8 ">
        <Container>
          <h1 className="text-3xl font-bold mb-2 text-primary">
            Welcome Back!
          </h1>
          <p className="text-sm">What do you want to cook today?</p>
          <SearchBar
            links={false}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            height={14}
          />
        </Container>
      </div>
      <Container className="mt-4">
        <div className="mt-8">
          <h2 className="font-bold">Trending Recipes</h2>
          {results[0].data ? (
            <div className="mt-2">
              <Slider {...settings}>
                {results[0].data.recipes.map(
                  (recipe: RecipeInformation, id: number) => (
                    <div key={id}>
                      <div className="h-48 w-58 relative rounded-lg overflow-hidden">
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          objectFit="cover"
                          objectPosition="center"
                          layout="fill"
                        />
                        <div className="bg-black opacity-20 absolute top-0 bottom-0 left-0 right-0 z-20"></div>
                        <div className="absolute bottom-5 left-5 z-30 text-white">
                          <h3 className="text-[1rem]">
                            {recipe.title.length > 15
                              ? recipe.title.slice(0, 15) + "..."
                              : recipe.title}
                          </h3>
                        </div>
                        <Link
                          href={`/recipes/${recipe.id}`}
                          className="absolute z-40 top-0 bottom-0 left-0 right-0"
                        ></Link>
                      </div>
                    </div>
                  )
                )}
              </Slider>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center p-8">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
        <div className="mt-8">
          <h2 className="font-bold"> Categories </h2>
          <div className="mt-2">
            <Slider {...settings}>
              {recipesCategories.map((item, id) => (
                <div key={id}>
                  <div className="h-32 w-58 relative rounded-lg overflow-hidden">
                    <Image
                      src={item.imagePath}
                      alt={item.category}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </div>
                  <h3 className="text-sm mt-2">{item.category}</h3>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-bold">Cuisines</h2>
          <div className="mt-4">
            <Slider {...cuisineSettings}>
              {cuisines.map((cuisine, id) => (
                <Button
                  key={id}
                  variant="link"
                  size="sm"
                  className={`cursor-default text-dark hover:no-underline w-auto text-sm hover:bg-secondary focus:bg-accent ${
                    selectedCuisine === cuisine && "bg-accent"
                  }`}
                  onClick={() => setSelectedCuisine(cuisine)}
                >
                  {cuisine}
                </Button>
              ))}
            </Slider>
          </div>
          {results[1].data ? (
            results[1].data.recipes.map(
              (recipe: RecipeInformation, id: number) => (
                <div
                  key={id}
                  className="mt-4 cursor-pointer flex space-x-4 relative"
                >
                  <div className="h-[4rem] w-[4rem] rounded-md relative overflow-hidden">
                    <Image
                      src={recipe.image}
                      alt={recipe.image}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col space-y-4 border-b flex-1 pb-2">
                    <h3>
                      {recipe.title.length > 20
                        ? recipe.title.slice(0, 20) + "..."
                        : recipe.title}
                    </h3>
                    <div className="flex space-x-8 items-center">
                      <div className="flex items-center justify-center space-x-1">
                        <LucideTimer height={20} width={20} />
                        <p className="text-xs">
                          {recipe.readyInMinutes} minutes
                        </p>
                      </div>
                      <p className="text-xs">
                        {recipe.pricePerServing > 400 ? "Expensive" : "Cheap"}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="absolute top-0 bottom-0 left-0 right-0"
                  ></Link>
                </div>
              )
            )
          ) : (
            <div className="flex w-full items-center justify-center p-8">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
