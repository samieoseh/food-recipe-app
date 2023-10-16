"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { register, Hanko } from "@teamhanko/hanko-elements";
import { hankoApi, supabase } from "@/constants";
import { User } from "@teamhanko/hanko-frontend-sdk";

export default function HankoAuth() {
  const router = useRouter();
  const [hanko, setHanko] = useState<Hanko>();

  const createUserIfNotExists = async (user: User) => {
    try {
      const { data, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", user.email);

      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        console.log("User already exists in the database");
      } else {
        const { error: insertError } = await supabase.from("Users").upsert([
          {
            email: user.email,
            username: "User",
          },
        ]);

        if (insertError) {
          console.error(insertError);
          return;
        }

        console.log("User created in the database");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) => {
      setHanko(new Hanko(hankoApi));
    });
  }, []);

  const redirectAfterLogin = useCallback(() => {
    router.push("/");
  }, [router]);

  useEffect(
    () =>
      hanko?.onAuthFlowCompleted(async () => {
        const user = await hanko.user.getCurrent();
        createUserIfNotExists(user);
        redirectAfterLogin();
      }),
    [hanko, redirectAfterLogin]
  );

  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log(error);
    });
  }, []);

  return <hanko-auth />;
}
