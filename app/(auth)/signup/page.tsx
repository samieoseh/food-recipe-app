"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { loginFormSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { ERROR_MESSAGE_TITLE, supabase } from "@/constants";
import { getUrl } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const SignUpPage = () => {
  const onSubmit = async (formData: z.infer<typeof loginFormSchema>) => {
    console.log("clean");
    try {
      setIsLoading(true);
      setIsError(false);

      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: getUrl(),
        },
      });

      if (error) {
        setIsError(true);
        toast({
          title: ERROR_MESSAGE_TITLE,
          description: "An error occurred during login",
          variant: "destructive",
        });
        return;
      }

      toast({
        description: "A verification message has been sent to provided email",
        variant: "success",
      });
    } catch (error) {
      setIsError(true);
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "samieoseh@gmail.com",
      password: "Tillidie19@123",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="mt-4 space-y-4 mx-12 md:w-[28rem] md:mx-auto">
      <h1 className="text-2xl">Create a New Account!</h1>
      <p className="text-sm text-gray-500">Get started quickly</p>
      <div className="flex justify-between flex-col space-y-4">
        <Button className="bg-transparent border text-dark hover:bg-gray-50">
          Continue with Google
        </Button>
        <Button className="bg-transparent text-dark border hover:bg-gray-50">
          Continue with Github
        </Button>
      </div>
      <div className="w-full flex justify-between space-x-4 mt-4 items-center">
        <span className="h-[0.08px] bg-gray-200 flex-1"></span>
        <p className="text-sm">Or</p>
        <span className="h-[0.08px] bg-gray-200 flex-1"></span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="space-y-[1.12rem]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-[1.12rem]">
                  <FormLabel className="text-sm">Email</FormLabel>
                  <FormControl>
                    <Input type="email" className="outline-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-0">
                  <FormLabel className="text-sm">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        className="outline-none pr-[2.5rem]"
                        {...field}
                      />
                      <Image
                        src={showPassword ? "/eye-closed.svg" : "/eye.svg"}
                        height={25}
                        width={19}
                        alt="eye.svg"
                        className="absolute cursor-pointer top-[29%] right-3"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            className="w-full mt-[0.75rem]"
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing up...
              </>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="mt-1 text-destructive text-xs text-center">
            {isError && "An error occurred during sign up"}
          </p>
        </form>
      </Form>
      <p className="text-xs text-center">
        Already have an account{" "}
        <Link href="/login" className="underline">
          Sign In Now
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
