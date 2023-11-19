import { getMealPlanIfExist } from "@/actions";
import Container from "@/components/Container";
import CreateMealPlanFlow from "@/components/CreateMealPlanFlow";
import RecommendedItems from "@/components/RecommendedItems";

export default async function MealPlannerPage() {
  //const mealPlan = await getMealPlanIfExist();
  const mealPlan = null;
  if (mealPlan) return <CreateMealPlanFlow />;
  else {
    return (
      <Container className="mt-4">
        <RecommendedItems />
      </Container>
    );
  }
}
