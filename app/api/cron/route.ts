import {
  generateWeeklyMealPlan,
  getMealPlanIfExist,
  getSupabaseServerClient,
} from "@/actions";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get all user in database
  const mealPlan = await getMealPlanIfExist();
  console.log(mealPlan);
  mealPlan?.forEach(async (element) => {
    const recommendations = await generateWeeklyMealPlan(
      element.calories_target,
      element.diets,
      element.exclude
    );
    const supabase = getSupabaseServerClient();
    const { error } = await supabase
      .from("MealPlan")
      .update({ recommendations: recommendations })
      .eq("id", element.id);

    if (error) {
      console.log(error);
    }
  });
  return Response.json({ meal: mealPlan });
}
