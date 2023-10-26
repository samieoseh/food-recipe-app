"use client";
import { hankoApi } from "@/constants";
import { parsedEnv } from "@/schemas";
import { Hanko } from "@teamhanko/hanko-elements";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuth = () => {
  const router = useRouter();

  const [hanko, setHanko] = useState<Hanko>();

  useEffect(() => {
    import("@teamhanko/hanko-elements").then(({ Hanko }) =>
      setHanko(new Hanko(hankoApi ?? ""))
    );
  }, []);

  const getCurrentUser = async () => {
    const hankoApi = parsedEnv.NEXT_PUBLIC_HANKO_API_URL;
    const hanko = new Hanko(hankoApi);

    const user = await hanko.user.getCurrent();
    return user;
  };

  const logout = async () => {
    console.log("logging out");
    try {
      await hanko?.user.logout();
      router.push("/auth");
      return;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return { logout: () => logout(), getCurrentUser: () => getCurrentUser() };
};

export default useAuth;
