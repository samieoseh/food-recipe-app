import { parsedEnv } from "@/schemas";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthApiError } from "@supabase/supabase-js";

const createCustomClient = (request: NextRequest) => {
  const response = NextResponse.next({
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
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );
  return { supabase, response };
};

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.nextUrl);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      const { supabase } = createCustomClient(request);
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      if (isAuthApiError(error)) {
        console.log(error);
      } else {
        throw error;
      }
    }
    console.log("success");
    return NextResponse.redirect(requestUrl.origin);
  }
  return NextResponse.redirect(requestUrl.origin);
}
