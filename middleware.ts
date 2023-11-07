import { NextResponse, NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { parsedEnv } from "./schemas";
import { getUrl } from "./lib/utils";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    parsedEnv.NEXT_PUBLIC_SUPABASE_URL,
    parsedEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    console.log("session is found", session);
    return response;
  } else {
    // redirect unauthenticated user to login page
    return NextResponse.redirect(getUrl() + "login");
  }
}

export const config = {
  matcher: ["/search", "/my-profile", "/meal-planner", "/my-recipe"],
};
