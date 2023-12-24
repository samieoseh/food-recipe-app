import { createBrowserClient } from "@supabase/ssr";
import { parsedEnv } from "./schemas";
import { DayOfWeekType } from "./types/typings";

const supabaseUrl = parsedEnv.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = parsedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);

export const ERROR_MESSAGE_TITLE = "Uh oh! Something went wrong";

export const legalAndPoliciesLink = [
  "Privacy Policy",
  "Terms of Service",
  "Refund Policy",
  "Accessibility Statement",
  "Cookie policy",
  "Terms and Condition",
  "Copyright Information",
];

export const customerSupportLinks = [
  "FAQs",
  "Contact Us",
  "Support",
  "Feedback and Suggestion",
];

export const publicMealPlans = [
  {
    id: 124,
    name: "Vegetarian Meal Plan",
    color: "#4caf50",
    icon: "/vegetarian.png",
  },
  { id: 711, name: "Paleo Meal Plan", color: "#ff5733", icon: "/paleo.png" },
  { id: 476, name: "Keto Meal Plan", color: "#ffd700", icon: "/keto.png" },
  {
    id: 128,
    name: "1500 Calorie Meal Plan",
    color: "#8b4513",
    icon: "/calories.png",
  },
];
export const baseUrl = "https://api.spoonacular.com";
export const searchRecipeUrl = baseUrl + "/recipes/complexSearch/";
export const connectUserUrl = baseUrl + "/users/connect";
export const addMeadPlanTemplateUrl = baseUrl + "/mealplanner/";
export const searchIngredientUrl = baseUrl + "/food/ingredients/search";
export const searchGroceryProductUrl = baseUrl + "/food/products/search";
export const searchMenuItemUrl = baseUrl + "/food/menuItems/search";
export const searchRestuarantUrl = baseUrl + "/food/restaurants/search";
export const recipeInformationUrl = baseUrl + "/recipes";
export const trendingRecipesUrl = baseUrl + "/recipes/random";
export const weeklyMealPlanUrl =
  baseUrl + "/mealplanner/generate?timeFrame=week";

export const searchCategories = new Map<string, string>([
  ["Recipes", searchRecipeUrl],
  ["Ingredients", searchIngredientUrl],
  ["Grocery", searchGroceryProductUrl],
  ["Menu", searchMenuItemUrl],
]);

export const categoryKeys = Array.from(searchCategories.keys());
export const recipesCategories = [
  { category: "Main Course", imagePath: "/main course.jpg" },
  { category: "Desert", imagePath: "/desert.jpg" },
  { category: "Appetizers", imagePath: "/appetizers.jpg" },
  { category: "Bread", imagePath: "/Bread.jpg" },
  { category: "Sauce", imagePath: "/sauce.jpg" },
  { category: "Salad", imagePath: "/salad.jpg" },
  { category: "Snacks", imagePath: "/Snacks.jpg" },
  { category: "Soup", imagePath: "/Soup.jpg" },
];

export const dietList = [
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Pescetarian",
  "Vegan",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

export const cuisines = [
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];

export const weeks: DayOfWeekType[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
