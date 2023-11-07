"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeUsers } from "@/types/typings";
import {
  addMeadPlanTemplateUrl,
  connectUserUrl,
  publicMealPlans,
  supabase,
} from "@/constants";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { ConnectedUserSchema, parsedEnv } from "@/schemas";
import { ConnectedUser } from "@/types/typings";

const formSchema = z.object({
  mealtitle: z.string().min(2, {
    message: "Meal Title must be at least 2 characters",
  }),
  makePublic: z.boolean().default(false).optional(),
});

export default function MealPlannerPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  console.log(supabase.auth.getSession())
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mealtitle: "",
      makePublic: false,
    },
  });

  const createMealPlan = async (
    userEmail: string,
    data: ConnectedUser,
    values: z.infer<typeof formSchema>
  ) => {
    console.log(data);
    const validatedData = ConnectedUserSchema.safeParse(data);

    if (!validatedData.success) {
      console.log(validatedData.error);
      setErrorMessage("An error occured");
      return;
    }
    try {
      const { error } = await supabase
        .from("Users")
        .update({
          spoonacular_hash: validatedData.data.hash,
          spoonacular_password: validatedData.data.spoonacularPassword,
          username: validatedData.data.username,
        })
        .eq("email", userEmail);

      const url =
        addMeadPlanTemplateUrl +
        validatedData.data.username +
        "/templates?hash=" +
        validatedData.data.hash +
        "&username=" +
        validatedData.data.username +
        "&apiKey=" +
        parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;

      console.log(url);
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          name: values.mealtitle,
          items: [],
          publishAsPublic: values.makePublic,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

      if (error) {
        console.log(error);
        setErrorMessage("An error occured");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occured");
    }
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setErrorMessage("");
    // get user email
    // try {

    //     const { data } = await supabase
    //       .from("Users")
    //       .select("*")
    //       .eq("email", user.email)
    //       .returns<RecipeUsers>();

    //     if (data && data[0].spoonacular_hash) {
    //       const connectedUser: ConnectedUser = {
    //         status: "success",
    //         username: data[0].username ?? "",
    //         spoonacularPassword: data[0].spoonacular_password ?? "",
    //         hash: data[0].spoonacular_hash ?? "",
    //       };
    //       console.log("Already exists");
    //       createMealPlan(user.email, connectedUser, values);
    //     } else {
    //       const url =
    //         connectUserUrl + "?apiKey=" + parsedEnv.NEXT_PUBLIC_SPONNACULAR_API;
    //       console.log(url);

    //       await fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify({
    //           email: user.email,
    //         }),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => createMealPlan(user.email, data, values))
    //         .catch((error) => console.log(error));
    //     }

    //     setLoading(false);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   setErrorMessage("An error occurred");
    //   setLoading(false);
    // }
  };

  return (
    <Container className="mt-8 items-center">
      <h1 className="text-2xl text-center font-bold">
        Create a meal plan or choose from existing template
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-[80%] md:w-[40%] flex-col justify-center mt-8 space-y-4"
        >
          <FormField
            control={form.control}
            name="mealtitle"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="E.g Low Fat Meal Plan"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="makePublic"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="public"
                      checked={field.value}
                      onCheckedChange={field.onChange as () => void}
                    />
                    <FormLabel htmlFor="public">
                      Make meal plan public
                    </FormLabel>
                  </div>
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          <Button disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : "Create"}
          </Button>
        </form>
      </Form>
      {errorMessage.length > 0 && (
        <p className="text-xs text-center text-red-600 mt-2">{errorMessage}</p>
      )}
      <div className="mt-8 space-y-8 w-full md:grid md:grid-cols-2 md:space-y-0 md:gap-8 cursor-pointer">
        {publicMealPlans.map((mealPlan, id) => (
          <div
            key={id}
            className="w-full h-36 flex items-center justify-between rounded-lg text-white space-x-4 "
            style={{ backgroundColor: `${mealPlan.color}` }}
          >
            <Image
              src={mealPlan.icon}
              alt="paleo diet"
              height={80}
              width={80}
              className="pl-4"
            />
            <p className="text-xl pr-8">{mealPlan.name}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
