"use server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { parsedEnv } from "./schemas";
import { MealPlanType } from "./types/typings";
import { weeklyMealPlanUrl } from "./constants";

export const getSupabaseServerClient = () => {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
  return supabase;
};
export const getUser = async () => {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      return session.user;
    } else {
      throw new Error("No user is authenticated");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchData = async (url: string) => {
  const data = await fetch(
    url + "&apiKey=" + parsedEnv.NEXT_PUBLIC_SPONNACULAR_API
  );
  return data.json();
};

export const addMealPlan = async (
  caloriesTarget: number | null,
  diets: string[],
  tags: string[]
) => {
  console.log("Adding meal plan", caloriesTarget);
  const supabase = getSupabaseServerClient();
  const user = await getUser();
  if (user) {
    const { error } = await supabase.from("MealPlan").insert([
      {
        user_id: user.id,
        calories_target: caloriesTarget,
        diets: diets,
        exclude: tags,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
  }
};

export const generateWeeklyMealPlan = async (
  caloriesTarget: number | null,
  diets: string[],
  tags: string[]
) => {
  let url = weeklyMealPlanUrl;
  if (diets.length > 0) {
    url = url + "&diet=" + diets.join(",").toLowerCase();
  }
  if (tags.length > 0) {
    url = url + "&excludes=" + tags.join(",").toLowerCase();
  }
  if (caloriesTarget) {
    url = url + "&targetCalories=" + caloriesTarget;
  }

  const recommendations = await fetchData(weeklyMealPlanUrl);

  const supabase = getSupabaseServerClient();
  const { data } = await supabase.from("MealPlan").select("id");

  if (data) {
    const today = new Date();
    const { error } = await supabase.from("Recommendations").insert({
      meal_plan_id: data[0].id,
      week_start_date: today,
      item: recommendations,
    });

    if (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }
};
export const getMealPlanIfExist = async () => {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("MealPlan").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data.length > 0 ? data : null;
};

export const deleteMealPlan = (id: number) => {};
