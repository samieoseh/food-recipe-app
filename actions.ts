import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
export const getUser = async () => {
  "use server";

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
    console.log("user session", session);
    if (session) {
      return session.user;
    } else {
      throw new Error("No user is authenticated");
    }
  } catch (error) {
    console.log(error);
  }
};
