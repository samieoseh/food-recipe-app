"use client";
import { parsedEnv } from "@/schemas";
import { Hanko } from "@teamhanko/hanko-elements";

const useAuth = () => {
  const getCurrentUser = async () => {
    const hankoApi = parsedEnv.NEXT_PUBLIC_HANKO_API_URL;
    const hanko = new Hanko(hankoApi);

    const user = await hanko.user.getCurrent();
    return user;
  };

  const logout = () => {
    console.log("log out");
  };

  return { logout: logout(), getCurrentUser: () => getCurrentUser() };
};

export default useAuth;
