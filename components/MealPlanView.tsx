import { MealPlansType } from "@/types/typings";
import Link from "next/link";
import EditMealPlanForm from "./EditMealPlanForm";
import { LucideTrash } from "lucide-react";
import { deleteMealPlan } from "@/actions";

const fmtDate = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toDateString();
};

const isActive = (date: string) => {
  const dateObj = new Date(date);
  const currentDate = new Date();

  return currentDate < dateObj;
};

const MealPlanView = ({ mealPlans }: { mealPlans: MealPlansType }) => {
  return (
    <div>
      {mealPlans.length > 0 ? (
        <div className="flex flex-col space-y-4 md:grid md:grid-cols-2 md:space-y-0 md:gap-4">
          {mealPlans.map((mealPlan) => (
            <div
              className="border w-full shadow-md p-4 rounded-lg cursor-pointer relative flex flex-col space-y-2"
              key={mealPlan.id}
            >
              <div className="flex justify-between">
                <p className="text-[#0c0c0c] font-bold">
                  {mealPlan.meal_plan_title.toUpperCase()}
                </p>
                <Link
                  href={`/meal-planner/${mealPlan.id}`}
                  className="absolute top-0 bottom-0 left-0 right-0 z-10"
                ></Link>
                <div className="z-20 flex space-x-4">
                  <EditMealPlanForm mealPlan={mealPlan} />
                  <div className="p-1">
                    <LucideTrash
                      stroke="#838383"
                      strokeWidth={2}
                      width={20}
                      height={20}
                      onClick={() => deleteMealPlan(mealPlan.id)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <small className="text-xs ">
                  {fmtDate(mealPlan.start_date)} - {fmtDate(mealPlan.end_date)}
                </small>
              </div>
              <div
                className={`rounded-lg p-1 flex items-center justify-center ${
                  isActive(mealPlan.end_date)
                    ? "w-12 bg-green-500 text-white"
                    : "w-14 bg-accent"
                }`}
              >
                <small>
                  {isActive(mealPlan.end_date) ? "active" : "inactive"}
                </small>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-2">
          <h2 className="font-bold text-2xl">So Empty</h2>
          <h3 className="text-sm">Nothing to show</h3>
        </div>
      )}
    </div>
  );
};

export default MealPlanView;
