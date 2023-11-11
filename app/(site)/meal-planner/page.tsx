import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { LucidePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllMealPlans } from "@/actions";
import MealPlanForm from "@/components/MealPlanForm";
import RealtimeMealPlans from "@/components/RealtimeMealPlans";

export default async function MealPlannerPage() {
  const data = await getAllMealPlans();
  return (
    <Container className="mt-8">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default">
              Create a new meal plan
              <LucidePlus height={20} width={20} className="ml-2" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-bold">
                CREATE A NEW MEAL PLAN
              </DialogTitle>
              <DialogDescription>Create a new meal plan here</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <MealPlanForm />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <RealtimeMealPlans serverMealPlans={data} />
    </Container>
  );
}
