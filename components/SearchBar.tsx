"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoryKeys } from "@/constants";
import { Button } from "./ui/button";
import { LucideSearch } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchFormSchema } from "../schemas";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

type searchBarPropsType = {
  height: number;
  links: boolean;
  searchInput?: string;
  category: string;
};

const SearchBar = ({
  height,
  links,
  searchInput,
  category,
}: searchBarPropsType) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(category);
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: searchInput ?? "",
    },
  });

  const onSubmit = (formValues: z.infer<typeof searchFormSchema>) => {
    router.push("/search/" + selectedCategory + "?query=" + formValues.query);
  };

  return (
    <Form {...form}>
      <form
        className="flex w-auto items-center justify-center relative mt-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <div
                className={`w-[24rem] md:w-[32rem] h-${height} lg:w-[48rem] mx-auto flex shadow-md rounded-md bg-white space-x-1 py-2 items-center relative border`}
              >
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className="text-xs w-28"
                        type="button"
                      >
                        {selectedCategory}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="w-48 p-2 flex flex-col">
                          {links
                            ? categoryKeys.map((category, id) => (
                                <Link
                                  className={`p-2 text-xs focus:bg-accent hover:bg-accent rounded no-underline ${
                                    selectedCategory === category &&
                                    "bg-secondary rounded"
                                  }`}
                                  key={id}
                                  href={
                                    "/search/" +
                                    category +
                                    "?query=" +
                                    field.value
                                  }
                                  onClick={() => {
                                    setSelectedCategory(category);
                                  }}
                                >
                                  {category}
                                </Link>
                              ))
                            : categoryKeys.map((category, id) => (
                                <p
                                  className={`p-2 text-xs focus:bg-accent hover:bg-accent rounded no-underline ${
                                    selectedCategory === category &&
                                    "bg-secondary rounded"
                                  }`}
                                  key={id}
                                  onClick={() => {
                                    setSelectedCategory(category);
                                  }}
                                >
                                  {category}
                                </p>
                              ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
                <span className="h-4 w-1 bg-gray-500 rounded-lg"></span>
                <Button
                  variant="link"
                  type="submit"
                  className="text-[#999999] p-0 mr-2 no-underline cursor-pointer absolute right-4 z-10"
                >
                  <LucideSearch height={20} width={20} />
                </Button>
                <FormControl>
                  <Input
                    placeholder="Search..."
                    type="text"
                    className="h-full w-[55%] outline-none border-none rounded-none"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchBar;
