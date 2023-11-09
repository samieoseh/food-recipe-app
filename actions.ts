"use server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { parsedEnv } from "./schemas";
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
  console.log("Server fetching", url);
  const data = await fetch(
    url + "&apiKey=" + parsedEnv.NEXT_PUBLIC_SPONNACULAR_API
  );
  return data.json();
};
