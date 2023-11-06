import { getUrl } from "@/lib/utils";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ERROR_MESSAGE_TITLE, supabase } from "@/constants";
import { toast } from "./ui/use-toast";

const AuthForm = ({
  onSubmit,
  isLoading,
  btnText,
}: {
  onSubmit: (formData: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
  btnText: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false);
  const [isGithubSignInLoading, setIsGithubSignInLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signInWithGoogle = async () => {
    setIsGoogleSignInLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: getUrl(),
        },
      });

      if (error) {
        toast({
          title: ERROR_MESSAGE_TITLE,
          description: "An error occurred during login",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: ERROR_MESSAGE_TITLE,
        description: "An error occurred during login",
        variant: "destructive",
      });
    }
  };

  const signInWithGithub = async () => {
    setIsGithubSignInLoading(true);
    console.log(getUrl());
    // try {
    //   const { error } = await supabase.auth.signInWithOAuth({
    //     provider: "github",
    //     options: {
    //       redirectTo: getUrl(),
    //     },
    //   });

    //   if (error) {
    //     toast({
    //       title: ERROR_MESSAGE_TITLE,
    //       description: error.message,
    //       variant: "destructive",
    //     });
    //   }
    // } catch (error) {
    //   toast({
    //     title: ERROR_MESSAGE_TITLE,
    //     description: "An error occurred during login",
    //     variant: "destructive",
    //   });
    // }
  };

  console.log(isGithubSignInLoading);
  return (
    <>
      <div className="flex justify-between flex-col space-y-4">
        <Button
          className="bg-transparent border text-dark hover:bg-gray-50 text-sm"
          onClick={signInWithGoogle}
          disabled={isGoogleSignInLoading ? true : false}
        >
          {isGoogleSignInLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Continue with Google
        </Button>
        <Button
          className="bg-transparent text-dark border hover:bg-gray-50 text-sm"
          onClick={signInWithGithub}
          disabled={isGithubSignInLoading ? true : false}
        >
          {isGithubSignInLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Continue with GitHub
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
            className="w-full mt-[0.75rem] text-sm"
            type="submit"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </>
            ) : (
              btnText
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AuthForm;
