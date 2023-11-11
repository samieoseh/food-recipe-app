"use client";
import { fetchData } from "@/actions";
import { trendingRecipesUrl } from "@/constants";
import { RecipeInformationType, TrendingRecipeType } from "@/types/typings";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingRecipe = () => {
  const url = trendingRecipesUrl + "?number=100";

  const { data } = useQuery<TrendingRecipeType>({
    queryKey: ["trending-recipe"],
    queryFn: () => fetchData(url),
  });

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
          slidesToScroll: 2,
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
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <h2 className="font-bold">Trending Recipes</h2>
      {data && (
        <div className="mt-2">
          <Slider {...settings}>
            {data.recipes.map((recipe: RecipeInformationType, id: number) => (
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
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default TrendingRecipe;
