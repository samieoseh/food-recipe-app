import { Hydrate, QueryClient, dehydrate } from "@tanstack/react-query";
import { cache } from "react";
import { fetchData } from "@/actions";
import { trendingRecipesUrl } from "@/constants";
import { parsedEnv } from "@/schemas";
import TrendingRecipe from "./TrendingRecipe";

const HydratedTrendingRecipe = async () => {
  const url =
    trendingRecipesUrl +
    "?apiKey=" +
    parsedEnv.NEXT_PUBLIC_SPONNACULAR_API +
    "&number=100";

  const queryClient = cache(() => new QueryClient())();
  await queryClient.prefetchQuery(["trending-recipe"], () => fetchData(url));
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <TrendingRecipe />
    </Hydrate>
  );
};

export default HydratedTrendingRecipe;
