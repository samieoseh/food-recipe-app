// loop through meal plan database

// generate meal plan for every user

import { getSupabaseServerClient } from "@/actions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get all user in database
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("MealPlan").select("*");
  if (error) {
    throw new Error("error occured");
  }
  console.log(data[0]);
  return NextResponse.json(
    {
      body: request.body,
      path: request.nextUrl.pathname,
      query: request.nextUrl.search,
      cookies: request.cookies.getAll(),
    },
    {
      status: 200,
    }
  );
}
