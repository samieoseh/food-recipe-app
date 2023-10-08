import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getCookie } from "cookies-next";
import * as jose from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getUserID = () => {
  const token = getCookie("hanko");
  const payload = jose.decodeJwt(token ?? "");
  const userID = payload.sub;
  return userID;
};
