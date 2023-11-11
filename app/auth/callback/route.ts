import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import { isAuthApiError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getUrl } from "@/lib/utils";

const createCustomClient = (request: NextRequest) => {
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
  return { supabase, cookieStore };
};

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.nextUrl);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    try {
      const { supabase } = createCustomClient(request);
      const {
        data: { session },
      } = await supabase.auth.exchangeCodeForSession(code);
      if (session) {
        await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
      }
    } catch (error) {
      if (isAuthApiError(error)) {
        console.log(error);
      } else {
        throw error;
      }
    }
    return NextResponse.redirect(getUrl() + "search");
  }
  return NextResponse.redirect(requestUrl.origin);
}
