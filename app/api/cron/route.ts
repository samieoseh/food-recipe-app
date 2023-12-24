import { generateWeeklyMealPlan, getMealPlanIfExist } from "@/actions";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get all user in database
  const mealPlan = getMealPlanIfExist();
  console.log(mealPlan);
  const result = await fetch(
    "http://worldtimeapi.org/api/timezone/America/Chicago",
    {
      cache: "no-store",
    }
  );
  const data = await result.json();
  return Response.json({ datetime: data.datetime });

  //const recommendations = generateWeeklyMealPlan();
}
