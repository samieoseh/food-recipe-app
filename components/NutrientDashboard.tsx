import { MealPlanNutrientType } from "@/types/typings";
import DoughnutChart from "./DoughnutChart";

const NutrientDashboard = ({
  nutrients,
}: {
  nutrients: MealPlanNutrientType;
}) => {
  return (
    <div className="flex flex-col md:items-center md:justify-center md:grid md:grid-cols-2 gap-8 max-w-[64rem] md:mx-auto pt-8">
      <div className="h-auto w-96 rounded-xl shadow-md p-4">
        <h3 className="text-center text-xl font-bold">
          Calories intake per day
        </h3>
        <DoughnutChart
          value={nutrients.calories}
          gray={3000 - nutrients.calories}
          unit="KCal"
          id="caloriesChart"
        />
      </div>
      <div className="h-auto w-96 rounded-xl shadow-md p-4">
        <h3 className="text-center text-xl font-bold">Fat intake per day</h3>
        <DoughnutChart
          value={nutrients.fat}
          gray={100 - nutrients.fat}
          unit="Grams"
          id="fatChart"
        />
      </div>
      <div className="h-auto w-96 rounded-xl shadow-md p-4">
        <h3 className="text-center text-xl font-bold">
          Carbohydrates intake per day
        </h3>
        <DoughnutChart
          value={nutrients.carbohydrates}
          gray={400 - nutrients.carbohydrates}
          unit="Grams"
          id="carbChart"
        />
      </div>
      <div className="h-auto w-96 rounded-xl shadow-md p-4">
        <h3 className="text-center text-xl font-bold">
          Protein intake per day
        </h3>
        <DoughnutChart
          value={nutrients.protein}
          gray={60 - nutrients.protein}
          unit="Grams"
          id="proteinChart"
        />
      </div>
    </div>
  );
};

export default NutrientDashboard;
