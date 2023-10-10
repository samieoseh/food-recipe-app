import { parsedEnv } from "./schemas";

export const hankoApi = parsedEnv.NEXT_PUBLIC_HANKO_API_URL;
export const baseUrl = "https://api.spoonacular.com";
export const searchRecipeUrl = baseUrl + "/recipes/complexSearch/";
