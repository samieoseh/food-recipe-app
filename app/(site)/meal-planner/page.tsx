import { getMealPlanIfExist } from "@/actions";
import Container from "@/components/Container";
import CreateMealPlanFlow from "@/components/CreateMealPlanFlow";
import RecommendedItems from "@/components/RecommendedItems";

export default async function MealPlannerPage() {
  const mealPlan = await getMealPlanIfExist();

  if (!mealPlan) return <CreateMealPlanFlow />;
  else {
    // get the recommended meals

    return (
      <Container className="mt-4">
        <RecommendedItems items={mealPlan[0].recommendations} />
      </Container>
    );
  }
}
