"use client";
import { supabase } from "@/constants";
import { MealPlansType } from "@/types/typings";
import { useEffect, useState } from "react";
import MealPlanView from "./MealPlanView";
import * as z from "zod";
import { searchMealPlanSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { LucideSearch } from "lucide-react";

export default function RealtimeMealPlans({
  serverMealPlans,
}: {
  serverMealPlans: MealPlansType;
}) {
  const [mealPlans, setMealPlans] = useState(serverMealPlans);
  const [mealPlansView, setMealPlansView] = useState(mealPlans);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMealPlans(serverMealPlans);
    setMealPlansView(serverMealPlans);
  }, [serverMealPlans]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "MealPlan" },
        (payload) => {
          setMealPlans((mealPlans: any) => [...mealPlans, payload.new]);
          setMealPlansView((mealPlans: any) => [...mealPlans, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverMealPlans]);

  useEffect(() => {
    console.log("Search query changed");
    const searchResult =
      searchQuery.length > 0
        ? mealPlans.filter((item) =>
            item.meal_plan_title
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        : mealPlans;
    setMealPlansView(searchResult);
  }, [searchQuery]);

  const form = useForm<z.infer<typeof searchMealPlanSchema>>({
    resolver: zodResolver(searchMealPlanSchema),
    defaultValues: {
      query: searchQuery,
    },
  });

  const onSubmit = async (values: z.infer<typeof searchMealPlanSchema>) => {
    console.log(values);
  };

  return (
    <div className="mt-8 space-y-4 flex flex-col">
      {/* Search bar */}
      <Form {...form}>
        <form
          className="w-[16rem] self-end"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      id="query"
                      placeholder="e.g Vegetarian"
                      {...field}
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      className="hover:bg-transparent focus:bg-transparent absolute top-0 right-0"
                    >
                      <LucideSearch height={20} width={20} stroke="#838383" />
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {/* Filter bar */}

      <MealPlanView mealPlans={mealPlansView} />
    </div>
  );
}
