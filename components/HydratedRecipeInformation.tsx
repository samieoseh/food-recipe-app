import { Hydrate, QueryClient, dehydrate } from "@tanstack/react-query";
import React, { cache } from "react";
import { fetchData } from "@/actions";
import RecipeInformation from "./RecipeInformation";
import { recipeInformationUrl } from "@/constants";
import { parsedEnv } from "@/schemas";

const HydratedRecipeInformation = async ({ id }: { id: string }) => {
  const url =
    recipeInformationUrl +
    "/" +
    id +
    "/information?apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API +
    "&includeNutrition=true";

  const queryClient = cache(() => new QueryClient())();
  await queryClient.prefetchQuery(["recipe-information"], () => fetchData(url));
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <RecipeInformation id={id} />
    </Hydrate>
  );
};

export default HydratedRecipeInformation;
