"use client";
import Slider from "react-slick";
import { Button } from "./ui/button";
import { useState } from "react";
import { RecipeInformationType, TrendingRecipeType } from "@/types/typings";
import Image from "next/image";
import { Loader2, LucideTimer } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cuisines, trendingRecipesUrl } from "@/constants";
import { parsedEnv } from "@/schemas";
import Link from "next/link";
import { fetchData } from "@/actions";

const Cuisine = () => {
  const [selectedCuisine, setSelectedCuisine] = useState("African");

  let url = trendingRecipesUrl + "?number=100";

  url = url + "&tags=," + selectedCuisine.toLowerCase();
  const { data } = useQuery<TrendingRecipeType>({
    queryKey: ["cuisine", selectedCuisine],
    queryFn: () => fetchData(url),
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
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(data);
  return (
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
      {data ? (
        data.recipes.map((recipe: RecipeInformationType, id: number) => (
          <div key={id} className="mt-4 cursor-pointer flex space-x-4 relative">
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
                  <p className="text-xs">{recipe.readyInMinutes} minutes</p>
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
        ))
      ) : (
        <div className="w-full flex items-center justify-center mt-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      )}
    </div>
  );
  return <div></div>;
};

export default Cuisine;
