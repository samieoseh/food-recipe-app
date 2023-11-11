import { ConnectedSpoonacularUserSchema, RecipeUserSchema } from "@/schemas";
import { Dispatch, SetStateAction } from "react";
import * as z from "zod";

export type Page = {
  number: number;
  offset: number;
  results: [];
  totalResults: number;
};

export type RecipePage = Omit<Page, "results"> & {
  results: SearchRecipeType[];
};

export type IngredientPage = Omit<Page, "results"> & {
  results: IngredientType[];
};

export type ProductPage = Omit<Page, "results"> & {
  products: SearchRecipeType[];
  processingTimeMs: number;
  type: string;
};

export type MenuPage = Omit<ProductPage, "products"> & {
  menuItems: SearchRecipeType[];
};

export type SearchRecipeType = {
  id: number;
  image: string;
  imageType?: string;
  title: string;
};
export type IngredientType = {
  id: number;
  name: string;
  image: string;
};

export type ProductType = SearchRecipeType & {
  restuarantChain: string;
  servings: {
    number: number;
    size: number | undefined;
    unit: number | undefined;
  };
};
export type MenuType = SearchRecipeType;

export type Instructions = {
  name: string;
  steps: {
    number: number;
    step: string;
    equipment: {
      id: number;
      name: string;
      image: string;
      localizedName: string;
    }[];
    ingredients: {
      id: number;
      image: string;
      localizedName: string;
      name: string;
    }[];
  }[];
};

export type EIngredients = {
  aisle: string;
  amount: number;
  consistency: string;
  id: number;
  image: string;
  measures: {
    us: { amount: number; unitShort: string; unitLong: string };
    metric: { amount: number; unitShort: string; unitLong: string };
  };
  meta: string[];
  name: string;
  nameClean: string;
  original: string;
  unit: string;
};

export type Nutrient = {
  name: string;
  amount: number;
  percentOfDailyNeeds: string;
  unit: string;
};

export type Nutrition = {
  caloricBreakdown: {
    percentCarbs: number;
    percentFat: number;
    percentProtein: number;
  };
  flavonoid: { name: string; amount: number; unit: string }[];
  ingredients: {
    amount: number;
    id: number;
    nutrients: Nutrient[];
  }[];
  nutrients: Nutrient[];
  propeties: { name: string; amount: number; unit: string }[];
  weightPerServing: { amount: number; unit: string };
};
export type RecipeInformationType = {
  aggregateLikes: 9;
  analyzedInstructions: Instructions[];
  cheap: boolean;
  pricePerServing: number;
  readyInMinutes: number;
  creditsText: string;
  cuisines: string[];
  dishTypes: string[];
  diaryFree: boolean;
  diets: string[];
  extendedIngredients: EIngredients[] | undefined;
  gaps: string;
  glutenFree: boolean;
  healthScore: number;
  id: number;
  image: string;
  imageType: string;
  instructions: string;
  license: string;
  lowFodmap: boolean;
  nutrition: Nutrition;
  servings: number;
  summary: string;
  title: string;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  weightWatcherSmartPoints: number;
  wineParing: { pairedWines: string[] };
  productMatches: {
    averageRating: number;
    description: string;
    id: number;
    imageUrl: string;
    price: number;
    ratingCount: number;
    title: string;
  }[];
};

export type TrendingRecipeType = {
  recipes: RecipeInformationType[];
};

export type FavoriteType = {
  id?: number;
  created_at?: Date;
  user_id?: string;
  item_id: number;
  category: string;
  image: string;
  title: string;
};

export type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[] | React.ReactNode;
  className?: string;
};

export type AppContextType = {
  favorites: FavoriteType[];
  addFavorite: (favorite: FavoriteType) => void;
  deleteFavorite: (favorite: FavoriteType) => void;
  isFavorite: (favorite: FavoriteType) => boolean;
  category: number;
  setCategory: Dispatch<SetStateAction<number>>;
};

export type CardProps = {
  id: number;
  category: string;
  title: string;
  image: string;
};

export type MealPlanType = {
  id: number;
  meal_plan_title: string;
  start_date: string;
  end_date: string;
};

export type MealPlansType = MealPlanType[];

export type RecipeUser = z.infer<typeof RecipeUserSchema>;
export type RecipeUsers = RecipeUser[];

export type ConnectedSpoonacularUser =
  | {
      status: "success";
      username: string;
      spoonacularPassword: string;
      hash: string;
    }
  | {
      status: "failure";
    }
  | {
      status: "idle";
      username?: string;
      spoonacularPassword?: string;
      hash?: string;
    };
