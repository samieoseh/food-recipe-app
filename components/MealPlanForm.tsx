"use client";
import {
  ERROR_MESSAGE_TITLE,
  addMeadPlanTemplateUrl,
  connectUserUrl,
  supabase,
} from "@/constants";
import {
  ConnectedSpoonacularUserSchema,
  mealPlannerFormSchema,
  parsedEnv,
} from "@/schemas";
import { ConnectedSpoonacularUser } from "@/types/typings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "./ui/use-toast";
import { addMealPlan } from "@/actions";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const MealPlanForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof mealPlannerFormSchema>>({
    resolver: zodResolver(mealPlannerFormSchema),
    defaultValues: {
      mealtitle: "bulala",
    },
  });

  const getCredentialsFromSpoonacular = async (email: string | undefined) => {
    if (email) {
      const url =
        connectUserUrl + "?apiKey=" + parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;
      console.log(url);

      try {
        const data = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email,
          }),
        });

        if (data.ok) {
          return data.json();
        } else {
          throw new Error("Something went wrong!");
        }
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    } else {
      throw "Email cannot be undefined";
    }
  };

  const onSubmit = async (values: z.infer<typeof mealPlannerFormSchema>) => {
    setLoading(true);
    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let validatedCredentials: ConnectedSpoonacularUser = {
      status: "idle",
    };

    if (user) {
      if (user.user_metadata.spoonacularHash) {
        // if spooonacular credentials exists
        validatedCredentials = {
          status: "success",
          username: user.user_metadata.username,
          hash: user.user_metadata.hash,
          spoonacularPassword: user.user_metadata.spoonacularPassword,
        };
      } else {
        try {
          const credentials: ConnectedSpoonacularUser =
            await getCredentialsFromSpoonacular(user.email);
          console.log(credentials);
          const validatedData =
            ConnectedSpoonacularUserSchema.safeParse(credentials);

          if (!validatedData.success) {
            // data does not follow the provided schema
            console.log(validatedData.error);
            toast({
              title: ERROR_MESSAGE_TITLE,
              description: "Could not validate credentials",
              variant: "destructive",
            });
            return;
          }

          validatedCredentials = {
            status: "success",
            hash: validatedData.data.hash,
            spoonacularPassword: validatedData.data.spoonacularPassword,
            username: validatedData.data.username,
          };

          await supabase.auth.updateUser({
            data: {
              hash: validatedCredentials.hash,
              spoonacularPassword: validatedCredentials.spoonacularPassword,
              username: validatedCredentials.username,
            },
          });
        } catch (error) {
          toast({
            title: ERROR_MESSAGE_TITLE,
            variant: "destructive",
          });
        }
      }
    }

    const url =
      addMeadPlanTemplateUrl +
      validatedCredentials.username +
      "/templates?hash=" +
      validatedCredentials.hash +
      "&username=" +
      validatedCredentials.username +
      "&apiKey=" +
      parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;

    console.log(url);

    // add plan to template
    // const data = await fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: values.mealtitle,
    //     items: [],
    //   }),
    // });

    // mutate the meal plans table with user data
    // if (!data.ok) {
    //   throw new Error("Something went wrong!");
    // }

    // console.log(data);
    try {
      await addMealPlan(values.mealtitle);
    } catch (error) {
      console.log(error);
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: "Error when creating meal plan",
        variant: "destructive",
      });
    }

    setLoading(false);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="col-span-4">
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
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : "Create Meal Plan"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default MealPlanForm;
