"use client";

import { useEffect } from "react";
import { register } from "@teamhanko/hanko-elements";
import { hankoApi } from "@/constants";

export default function HankoProfile() {
  useEffect(() => {
    register(hankoApi).catch((error) => {
      console.log(error);
    });
  }, []);

  return <hanko-profile />;
}
