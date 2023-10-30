"use client";

import { useState } from "react";
import * as z from "zod";
import { ERROR_MESSAGE_TITLE, supabase } from "@/constants";
import { getUrl } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { formSchema } from "@/schemas";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: getUrl(),
        },
      });

      if (error) {
        toast({
          title: ERROR_MESSAGE_TITLE,
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        description: "A verification message has been sent to provided email",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: "An error occurred during login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 space-y-4 mx-12 md:w-[28rem] md:mx-auto">
      <h1 className="text-2xl">Get Started</h1>
      <p className="text-sm text-gray-500">Create a new account now</p>
      <AuthForm isLoading={isLoading} onSubmit={onSubmit} btnText="Sign Up" />
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
