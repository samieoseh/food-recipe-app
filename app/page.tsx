"use client";
import Container from "@/components/Container";
import Navbar from "@/components/Navbar";
import { getUserID } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function HomePage() {
  // const [userID, setUserID] = useState("");
  // useEffect(() => {
  //   const userIDFromSession = getUserID();
  //   if (userIDFromSession) {
  //     setUserID(userIDFromSession);
  //   }
  // }, []);
  return (
    <>
      <Container>
        <h1 className="text-3xl mt-4">Welcome Samuel</h1>
      </Container>
    </>
  );
}
