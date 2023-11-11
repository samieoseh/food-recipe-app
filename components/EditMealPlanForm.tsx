import { useForm } from "react-hook-form";
import { mealPlannerFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, LucideEdit } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { useState } from "react";
import { Input } from "./ui/input";
import { MealPlanType } from "@/types/typings";

const EditMealPlanForm = ({ mealPlan }: { mealPlan: MealPlanType }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof mealPlannerFormSchema>>({
    resolver: zodResolver(mealPlannerFormSchema),
    defaultValues: {
      mealtitle: mealPlan.meal_plan_title,
    },
  });

  const onSubmit = async (values: z.infer<typeof mealPlannerFormSchema>) => {
    setLoading(true);
    console.log(values);
    setLoading(false);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="p-1">
            <LucideEdit
              stroke="#838383"
              strokeWidth={2}
              width={20}
              height={20}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-bold">Update Meal Plan</DialogTitle>
            <DialogDescription>
              Update your meal plan here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="col-span-4"
                >
                  <FormField
                    control={form.control}
                    name="mealtitle"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="name" className="text-right">
                          Meal Plan Title
                        </Label>
                        <FormControl>
                          <Input
                            id="name"
                            placeholder="e.g 1500 calories meal plan"
                            className=""
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter className="mt-8">
                    <Button type="submit" disabled={loading}>
                      {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {loading ? "Please wait..." : "Save Changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMealPlanForm;
