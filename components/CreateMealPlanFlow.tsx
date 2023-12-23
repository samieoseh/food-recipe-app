"use client";
import { useState } from "react";
import Container from "./Container";
import { Button } from "./ui/button";
import TagInput from "./TagInput";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { caloriesFormSchema, tagFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, LucideArrowLeftCircle } from "lucide-react";
import { ERROR_MESSAGE_TITLE, dietList, supabase } from "@/constants";
import { toast } from "./ui/use-toast";
import { addMealPlan, generateWeeklyMealPlan } from "@/actions";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";

const CreateMealPlanFlow = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [diets, setDiets] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCaloriesInput, setShowCaloriesInput] = useState<boolean | null>(
    null
  );
  const [caloriesTarget, setCaloriesTarget] = useState<number | null>(null);

  const tagForm = useForm<z.infer<typeof tagFormSchema>>({
    resolver: zodResolver(tagFormSchema),
    defaultValues: {
      tag: "",
    },
  });

  const caloriesTargetForm = useForm<z.infer<typeof caloriesFormSchema>>({
    resolver: zodResolver(caloriesFormSchema),
    defaultValues: {
      calories: 100,
    },
    mode: "onChange",
  });

  const onCaloriesSubmit = (values: z.infer<typeof caloriesFormSchema>) => {
    if (showCaloriesInput) {
      setCaloriesTarget(values.calories);
    }
    setCurrentStep(currentStep + 1);
  };

  const onTagSubmit = (values: z.infer<typeof tagFormSchema>) => {
    if (!tags.some((item) => values.tag.toLowerCase() == item.toLowerCase())) {
      setTags([...tags, values.tag]);
      tagForm.reset();
    }
  };

  const onFlowComplete = async () => {
    try {
      await addMealPlan(caloriesTarget, diets, tags);
    } catch (error) {
      console.log(error);
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: "Error when creating meal plan",
        variant: "destructive",
      });
    }

    router.refresh();
  };

  return (
    <Container className="mt-4">
      {currentStep > 1 && (
        <LucideArrowLeftCircle
          onClick={() => setCurrentStep(currentStep - 1)}
        />
      )}
      <div className="mt-16 max-w-2xl mx-auto">
        {currentStep === 1 && (
          <>
            <h1 className="text-2xl text-center font-bold py-2">
              Do you have a specific target for your calories intake?
            </h1>
            <div className="mt-8 w-full flex justify-between space-x-8">
              <Button
                className={`flex-1 ${showCaloriesInput && "bg-secondary"}`}
                variant="outline"
                onClick={() => setShowCaloriesInput(true)}
              >
                Yes
              </Button>
              <Button
                className={`flex-1 ${
                  showCaloriesInput === false && "bg-secondary"
                }`}
                variant="outline"
                onClick={() => setShowCaloriesInput(false)}
              >
                No
              </Button>
            </div>
            <div>
              <Form {...caloriesTargetForm}>
                <form
                  onSubmit={caloriesTargetForm.handleSubmit(onCaloriesSubmit)}
                >
                  <FormField
                    control={caloriesTargetForm.control}
                    name="calories"
                    render={({ field }) => (
                      <FormItem
                        className={`mt-8 ${!showCaloriesInput && "hidden"}`}
                      >
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g 100"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="absolute mx-auto bottom-10 left-0 right-0  w-[95%] md:w-full border md:relative md:bottom-0 md:mt-8 cursor-default"
                    disabled={showCaloriesInput === null}
                  >
                    Continue
                  </Button>
                </form>
              </Form>
            </div>
          </>
        )}
        {currentStep === 2 && (
          <>
            <h1 className="text-2xl text-center font-bold py-2">
              Do you follow any special diet?
            </h1>
            <div className="mt-8 w-full mx-auto flex flex-wrap gap-3 py-4">
              {dietList.map((diet, id) => (
                <Button
                  variant="outline"
                  className={`border rounded-full p-3 cursor-pointer ${
                    diets.some((item) => diet == item) && "border-primary"
                  }`}
                  key={id}
                  onClick={() => {
                    // check if diet is in the array

                    if (diets.some((item) => diet == item)) {
                      const newDiets = diets.filter((item) => item != diet);
                      setDiets(newDiets);
                    } else {
                      setDiets([diet, ...diets]);
                    }
                  }}
                >
                  {diet}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => {
                setCurrentStep(currentStep + 1);
              }}
              className="absolute mx-auto bottom-10 left-0 right-0  w-[95%] md:w-full border md:relative md:bottom-0 md:mt-8 cursor-default"
            >
              Continue
            </Button>
          </>
        )}
        {currentStep === 3 && (
          <Form {...tagForm}>
            <form onSubmit={tagForm.handleSubmit(onTagSubmit)}>
              <>
                <h1 className="text-2xl text-center font-bold py-2">
                  Do you have any allergies we should take note of
                </h1>
                <div className="mt-8 w-full">
                  <FormField
                    control={tagForm.control}
                    name="tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <TagInput
                            field={field}
                            tags={tags}
                            setTags={setTags}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            </form>
            <Button
              onClick={async () => {
                if (currentStep === 3) {
                  setLoading(true);
                  await onFlowComplete();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="absolute mx-auto bottom-10 left-0 right-0  w-[95%] md:w-full border md:relative md:bottom-0 md:mt-8 cursor-default"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Please wait..." : "Continue"}
            </Button>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default CreateMealPlanFlow;
