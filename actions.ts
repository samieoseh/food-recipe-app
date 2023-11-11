"use server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { parsedEnv } from "./schemas";

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

export const addMealPlan = async (mealPlanTitle: string) => {
  const supabase = getSupabaseServerClient();
  const user = await getUser();
  const { error } = await supabase
    .from("MealPlan")
    .insert([{ meal_plan_title: mealPlanTitle, user_id: user?.id }]);

  if (error) {
    throw new Error(error.message);
  }
};

export const getAllMealPlans = async () => {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("MealPlan").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteMealPlan = (id: number) => {};
