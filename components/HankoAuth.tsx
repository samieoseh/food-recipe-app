"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { hankoApi, supabase } from "@/constants";
import { User } from "@teamhanko/hanko-frontend-sdk";
import { useToast } from "@/components/ui/use-toast";

export default function HankoAuth() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();
  const { toast } = useToast();

  const createUserIfNotExists = async (user: User) => {
    try {
      const { data } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      if (!(data && data.length > 0)) {
        // Create a new user
        const { error: insertError } = await supabase.from("Users").upsert([
          {
            email: user.email,
          },
        ]);

        if (insertError)
          throw new Error(`Error creating user: ${insertError.message}`);

        toast({
          title: "Account Created Successfully",
          variant: "success",
        });

        return;
      }

      // user already exists
      toast({
        title: "Login Successfull",
        variant: "success",
      });
    } catch (error) {
      throw new Error("Error checking/creating user");
    }
  };

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) => {
      setHanko(new Hanko(hankoApi));
    });
  }, []);

  const redirectAfterLogin = useCallback(() => {
    router.push("/profile");
  }, [router]);

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(async () => {
        const user = await hanko.user.getCurrent();
        try {
          await createUserIfNotExists(user);
          redirectAfterLogin();
        } catch (error) {
          toast({
            title: "Uh oh! Something went wrong.",
            variant: "destructive",
          });
        }
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log("error occurred", error);
    });
  }, []);

  return <hanko-auth />;
}
