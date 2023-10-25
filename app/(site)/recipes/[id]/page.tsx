"use client";
import Container from "@/components/Container";
import { recipeInformationUrl } from "@/constants";
import { fetchData } from "@/lib/utils";
import { parsedEnv } from "@/schemas";
import { RecipeInformation } from "@/types/typings";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";

export default function RecipeInformationPage({
  params,
}: {
  params: { id: string };
}) {
  const url =
    recipeInformationUrl +
    "/" +
    params.id +
    "/information?apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API +
    "&includeNutrition=true";

  const { data } = useQuery<RecipeInformation>(
    ["recipe-information", params.id],
    () => fetchData(url)
  );

  return (
    <div>
      {!data ? (
        <div className="w-full flex items-center justify-center mt-4">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        <div>
          <div className="w-full h-[300px] relative -z-20">
            <Image src={data.image} alt={data.image} layout="fill" />
          </div>
          <div className="z-10 mt-[-2rem] rounded-t-3xl bg-white py-8 px-4">
            <h1 className="font-bold text-2xl my-2">{data.title}</h1>
            <p className="text-sm text-muted-foreground">
              {parse(data.summary)}
            </p>
            <div className="mx-12 mt-4 flex justify-between">
              <p className="text-sm flex flex-col items-center justify-center">
                {data.readyInMinutes}
                <span>minutes</span>
              </p>
              <span className="border-[0.2px] rounded"></span>
              <p className="text-sm flex flex-col items-center justify-center">
                {data.nutrition.caloricBreakdown.percentCarbs}{" "}
                <span>Kcals</span>
              </p>
              <span className="border-[0.2px] rounded"></span>
              <p className="text-sm flex flex-col items-center justify-center">
                {data.servings} <span>Servings</span>
              </p>
            </div>
            <div className="text-xl mt-8 font-bold">
              <h2 className="text-2xl">Ingredients</h2>
              <div className="mt-4 flex flex-col space-y-4">
                {data.extendedIngredients?.map((ingredient, id) => (
                  <div key={id} className="flex items-center space-x-4">
                    <div className="relative h-[20px] w-[20px] ">
                      <Image
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                        layout="fill"
                        alt={ingredient.image}
                      />
                    </div>
                    <p className="font-normal text-sm">{ingredient.original}</p>
                  </div>
                ))}
              </div>
            </div>
            {data.analyzedInstructions.length > 0 && (
              <div className="text-xl mt-8 font-bold">
                <h2 className="text-2xl">Meal Preparation</h2>
                <ul className="mt-4 flex flex-col font-normal text-sm space-y-4 border-l">
                  {data.analyzedInstructions[0].steps.map((step, id) => (
                    <div key={id} className="pl-8">
                      <h4 className="text-xl font-bold">Step {id + 1}</h4>
                      {step.equipment.length > 0 && (
                        <div className="pl-8 border-l py-2">
                          <h6 className="font-bold">Equipment</h6>
                          <ul className="flex space-x-2 items-center flex-wrap">
                            {step.equipment.map((equi, id) => (
                              <Image
                                src={`https://spoonacular.com/cdn/equipment_100x100/${equi.image}`}
                                alt={equi.localizedName}
                                height={40}
                                width={40}
                                key={id}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.ingredients.length > 0 && (
                        <div className="pl-8 border-l py-2">
                          <h6 className="font-bold">Ingredient</h6>
                          <ul className="flex space-x-2 items-center flex-wrap">
                            {step.ingredients.map((ingredient, id) => (
                              <Image
                                src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                                alt={ingredient.localizedName}
                                height={40}
                                width={40}
                                key={id}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                      {step.step && step.step !== "" && (
                        <div className="pl-8 border-l py-2">
                          <h6 className="font-bold">Direction</h6>
                          <p>{step.step}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            )}

            <Button className="w-full mt-8">Save Recipe</Button>
          </div>
        </div>
      )}
    </div>
  );
}
