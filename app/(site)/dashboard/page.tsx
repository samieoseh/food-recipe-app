"use client";
import Container from "@/components/Container";
import { trendingRecipesUrl } from "@/constants";
import { fetchData } from "@/lib/utils";
import { parsedEnv } from "@/schemas";
import { TrendingRecipeType } from "@/types/typings";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function DashboardPage() {
  const url =
    trendingRecipesUrl +
    "?apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API +
    "&number=100";
  const { data, isError } = useQuery<TrendingRecipeType>(["trending"], () =>
    fetchData(url)
  );

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
    <Container className="mt-4">
      <h1 className="text-3xl font-bold mb-2 text-primary">Welcome Back!</h1>
      <p className="text-sm">What do you want to cook today?</p>
      <div className="mt-8">
        <h2 className="font-bold">Trending Recipes</h2>
        {data ? (
          <div className="mt-2">
            <Slider {...settings}>
              {data.recipes.map((recipe, id) => (
                <div key={id}>
                  <div className="h-48 w-58 relative rounded-lg overflow-hidden cursor-pointer">
                    <Image
                      src={recipe.image}
                      alt={recipe.image}
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
        ) : (
          <div className="flex w-full items-center justify-center p-8">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        )}
      </div>
      <div className="mt-8">
        <h2 className="font-bold"> Categories </h2>
        {/* Vegetables, dessert, etc*/}
      </div>
      <div>
        <h2>Cuisines</h2>
      </div>
    </Container>
  );
}
