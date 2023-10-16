import { parsedEnv } from "./schemas";

export const hankoApi = parsedEnv.NEXT_PUBLIC_HANKO_API_URL;
export const baseUrl = "https://api.spoonacular.com";
export const searchRecipeUrl = baseUrl + "/recipes/complexSearch/";
export const searchIngredientUrl = baseUrl + "/food/ingredients/search";
export const searchGroceryProductUrl = baseUrl + "/food/products/search";
export const searchMenuItemUrl = baseUrl + "/food/menuItems/search";
export const searchRestuarantUrl = baseUrl + "/food/restaurants/search";

export const searchCategories = [
  { category: "Recipes", url: searchRecipeUrl },
  { category: "Ingredients", url: searchIngredientUrl },
  { category: "Grocery Products", url: searchGroceryProductUrl },
  { category: "Menu Items", url: searchMenuItemUrl },
  { category: "Restuarants", url: searchRestuarantUrl },
];
