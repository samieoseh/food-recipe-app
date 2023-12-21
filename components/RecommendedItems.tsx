"use client";
import { data, months, weeks } from "@/constants";
import { useState } from "react";
import DayOfWeekPicker from "./DayOfWeekPicker";
import Image from "next/image";
import Link from "next/link";
import NutrientDashboard from "./NutrientDashboard";

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
      <div className="lg:flex lg:justify-between mt-8">
        <div>
          <h2 className="text-gray-500 py-2">BREAKFAST</h2>
          <div className="flex gap-4 py-2 items-center relative">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <Image src="/Bread.jpg" alt="Bread.jpg" layout="fill" />
            </div>
            <div>
              <p className="font-bold">
                {mealPlan.meals[0].title.length > 20
                  ? mealPlan.meals[0].title.slice(0, 19) + "..."
                  : mealPlan.meals[0].title}
              </p>
              <p className="text-gray-500 text-sm flex gap-2">
                {mealPlan.meals[0].servings} servings
                <span>|</span>
                <span className="flex items-center ">
                  {mealPlan.meals[0].readyInMinutes} minutes
                </span>
              </p>
            </div>
            <Link
              href={`/recipes/${mealPlan.meals[0].id}`}
              className="absolute top-0 bottom-0 left-0 right-0"
            ></Link>
          </div>
        </div>
        <div>
          <h2 className="text-gray-500 py-2">LUNCH</h2>
          <div className="flex gap-4 py-2 items-center relative">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <Image src="/Bread.jpg" alt="Bread.jpg" layout="fill" />
            </div>
            <div>
              <p className="font-bold">
                {mealPlan.meals[1].title.length > 20
                  ? mealPlan.meals[1].title.slice(0, 19) + "..."
                  : mealPlan.meals[1].title}
              </p>
              <p className="text-gray-500 text-sm flex gap-2">
                {mealPlan.meals[1].servings} servings
                <span>|</span>
                <span className="flex items-center ">
                  {mealPlan.meals[1].readyInMinutes} minutes
                </span>
              </p>
            </div>
            <Link
              href={`/recipes/${mealPlan.meals[1].id}`}
              className="absolute top-0 bottom-0 left-0 right-0"
            ></Link>
          </div>
        </div>
        <div>
          <h2 className="text-gray-500 py-2">DINNER</h2>
          <div className="flex gap-4 py-2 items-center relative">
            <div className="relative h-16 w-16 rounded-md overflow-hidden">
              <Image src="/Bread.jpg" alt="Bread.jpg" layout="fill" />
            </div>
            <div>
              <p className="font-bold">
                {mealPlan.meals[2].title.length > 20
                  ? mealPlan.meals[2].title.slice(0, 19) + "..."
                  : mealPlan.meals[2].title}
              </p>
              <p className="text-gray-500 text-sm flex gap-2">
                {mealPlan.meals[2].servings} servings
                <span>|</span>
                <span className="flex items-center ">
                  {mealPlan.meals[2].readyInMinutes} minutes
                </span>
              </p>
            </div>
            <Link
              href={`/recipes/${mealPlan.meals[2].id}`}
              className="absolute top-0 bottom-0 left-0 right-0"
            ></Link>
          </div>
        </div>
      </div>
      <NutrientDashboard nutrients={mealPlan.nutrients} />
    </div>
  );
};

export default RecommendedItems;
