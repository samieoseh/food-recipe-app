"use client";

import { useState } from "react";
import * as z from "zod";
import { formSchema } from "@/schemas";
import { ERROR_MESSAGE_TITLE, supabase } from "@/constants";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
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
        title: "Login successful",
        variant: "success",
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: "An error occurred during login",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4 space-y-4 mx-12 md:w-[28rem] md:mx-auto">
      <h1 className="text-2xl">Welcome Back!</h1>
      <p className="text-xs text-gray-500">Sign in to your account</p>
      <AuthForm isLoading={isLoading} onSubmit={onSubmit} btnText="Sign In" />
      <p className="text-xs text-center">
        Don&quot;t have an account{" "}
        <Link href="/signup" className="underline">
          Sign Up Now
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
