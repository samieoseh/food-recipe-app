"use client";
import { data, months, weeks } from "@/constants";
import { DayOfWeekType } from "@/types/typings";
import { useState } from "react";
import DayOfWeekPicker from "./DayOfWeekPicker";

const RecommendedItems = () => {
  const [day, setDay] = useState(new Date());
  const dayOfWeek = weeks[(day.getDay() + 6) % 7];

  const month = months[day.getMonth()];
  const mealPlan = data["week"][dayOfWeek];
  return (
    <div>
      <h1 className="text-2xl font-bold">Meal Plan</h1>
      <DayOfWeekPicker day={day} setDay={setDay} />
      <p className="font-bold mt-4">
        {dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1)},{" "}
        {day.getDate()} {month}
      </p>
      <div>
        <h2>BREAKFAST</h2>
        <div>
          <p>{mealPlan.meals[0].title}</p>
          <p>{mealPlan.meals[0].servings} servings</p>
          <div>
            <p>Ready in {mealPlan.meals[0].readyInMinutes} minutes</p>
          </div>
        </div>
      </div>
      <div>
        <h2>LUNCH</h2>
        <p>{mealPlan.meals[1].title}</p>
        <p>{mealPlan.meals[1].servings} servings</p>
        <div>
          <p>Ready in {mealPlan.meals[1].readyInMinutes} minutes</p>
        </div>
      </div>
      <div>
        <h2>DINNER</h2>
        <p>{mealPlan.meals[2].title}</p>
        <p>{mealPlan.meals[2].servings} servings</p>
        <div>
          <p>Ready in {mealPlan.meals[2].readyInMinutes} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendedItems;
