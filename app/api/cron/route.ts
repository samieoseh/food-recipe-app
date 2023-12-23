import { generateWeeklyMealPlan, getMealPlanIfExist } from "@/actions";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get all user in database
  const mealPlan = getMealPlanIfExist();
  console.log(mealPlan);
  //const recommendations = generateWeeklyMealPlan();
  //console.log(recommendations);
}
