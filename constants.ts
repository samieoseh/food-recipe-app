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

export const data = {
  week: {
    friday: {
      meals: [
        {
          id: 664280,
          title: "Vanilla Bean Cherry Granola Bars",
          servings: 8,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/vanilla-bean-cherry-granola-bars-664280",
          readyInMinutes: 45,
        },
        {
          id: 157018,
          title: "Couscous with fried vegetables",
          servings: 1,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/couscous-with-fried-vegetables-157018",
          readyInMinutes: 30,
        },
        {
          id: 640982,
          title: "Cuban Black Beans & Rice",
          servings: 4,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/cuban-black-beans-rice-640982",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 62.36,
        protein: 56.51,
        calories: 1907.28,
        carbohydrates: 287.04,
      },
    },
    monday: {
      meals: [
        {
          id: 716211,
          title: "Cherry Blueberry Muffins",
          servings: 12,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/cherry-blueberry-muffins-716211",
          readyInMinutes: 45,
        },
        {
          id: 653251,
          title: "Noodles and Veggies With Peanut Sauce",
          servings: 4,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/noodles-and-veggies-with-peanut-sauce-653251",
          readyInMinutes: 30,
        },
        {
          id: 641687,
          title: "Dry Mee Siam",
          servings: 3,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/dry-mee-siam-641687",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 58.62,
        protein: 52.88,
        calories: 1845.21,
        carbohydrates: 277.06,
      },
    },
    sunday: {
      meals: [
        {
          id: 657343,
          title: "Pumpkin Pecan Streusel Muffins",
          servings: 16,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/pumpkin-pecan-streusel-muffins-657343",
          readyInMinutes: 45,
        },
        {
          id: 715769,
          title: "Broccolini Quinoa Pilaf",
          servings: 2,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/broccolini-quinoa-pilaf-715769",
          readyInMinutes: 30,
        },
        {
          id: 641687,
          title: "Dry Mee Siam",
          servings: 3,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/dry-mee-siam-641687",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 62.87,
        protein: 48.1,
        calories: 1817.37,
        carbohydrates: 268.61,
      },
    },
    tuesday: {
      meals: [
        {
          id: 1697613,
          title: "Apple Cider Muffins with Cinnamon Streusel",
          servings: 16,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/apple-cider-muffins-with-cinnamon-streusel-1697613",
          readyInMinutes: 60,
        },
        {
          id: 157344,
          title: "Spicy Salad with Kidney Beans, Cheddar, and Nuts",
          servings: 1,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/spicy-salad-with-kidney-beans-cheddar-and-nuts-157344",
          readyInMinutes: 10,
        },
        {
          id: 636714,
          title: "Cajun Cuisine: Vegan Jambalaya",
          servings: 4,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/cajun-cuisine-vegan-jambalaya-636714",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 63.92,
        protein: 52.78,
        calories: 1847.49,
        carbohydrates: 274.86,
      },
    },
    saturday: {
      meals: [
        {
          id: 1697613,
          title: "Apple Cider Muffins with Cinnamon Streusel",
          servings: 16,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/apple-cider-muffins-with-cinnamon-streusel-1697613",
          readyInMinutes: 60,
        },
        {
          id: 1697541,
          title: "Pasta With Feta Cheese And Asparagus",
          servings: 2,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/pasta-with-feta-cheese-and-asparagus-1697541",
          readyInMinutes: 20,
        },
        {
          id: 633093,
          title: "Autumn Fried Rice with Buffalo Nuts®",
          servings: 8,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/autumn-fried-rice-with-buffalo-nuts-633093",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 63.84,
        protein: 50.86,
        calories: 1835.61,
        carbohydrates: 264.17,
      },
    },
    thursday: {
      meals: [
        {
          id: 653270,
          title: "Nori Seaweed Muffins",
          servings: 12,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/nori-seaweed-muffins-653270",
          readyInMinutes: 45,
        },
        {
          id: 715769,
          title: "Broccolini Quinoa Pilaf",
          servings: 2,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/broccolini-quinoa-pilaf-715769",
          readyInMinutes: 30,
        },
        {
          id: 634404,
          title: "Basic Risotto",
          servings: 2,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/basic-risotto-634404",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 65.67,
        protein: 50.12,
        calories: 1887.4,
        carbohydrates: 273.72,
      },
    },
    wednesday: {
      meals: [
        {
          id: 655786,
          title: "Persimmons Pumpkin Orange Smoothie With Chia Seeds",
          servings: 3,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/persimmons-pumpkin-orange-smoothie-with-chia-seeds-655786",
          readyInMinutes: 45,
        },
        {
          id: 643674,
          title: "Fried Brown Rice",
          servings: 2,
          imageType: "jpg",
          sourceUrl: "https://spoonacular.com/fried-brown-rice-643674",
          readyInMinutes: 25,
        },
        {
          id: 636714,
          title: "Cajun Cuisine: Vegan Jambalaya",
          servings: 4,
          imageType: "jpg",
          sourceUrl:
            "https://spoonacular.com/cajun-cuisine-vegan-jambalaya-636714",
          readyInMinutes: 45,
        },
      ],
      nutrients: {
        fat: 69.32,
        protein: 49.17,
        calories: 2050.86,
        carbohydrates: 323.6,
      },
    },
  },
};

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
