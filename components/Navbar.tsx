"use client";

import Link from "next/link";
import { Loader2, Menu, X } from "lucide-react";
import { Alex_Brush } from "next/font/google";
import { useState } from "react";
import { Button } from "./ui/button";
import { handleLogout } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const brushSc = Alex_Brush({ weight: "400", subsets: ["latin"] });
const Navbar = ({ user }: { user: User | undefined }) => {
  const [showNav, setShowNav] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-[90%] lg:w-[90%] lg:w[396px] flex justify-between py-2 lg:py-0 mx-auto items-center">
      <Link href="/" className={`text-[1.5rem] ${brushSc.className}`}>
        Foodie
      </Link>
      {/* Menu */}
      <ul
        className={`shadow-lg lg:shadow-none absolute w-full h-auto py-4 top-[2.6rem] left-0 bg-white space-y-2  px-8 lg:flex lg:relative lg:justify-between lg:items-center lg:space-x-16 lg:w-auto lg:top-0 lg:space-y-0 ${
          !showNav && "hidden"
        }`}
      >
        <li className="lg:p-0">
          <Link
            href="/my-recipe"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            My Recipe
          </Link>
        </li>
        <li className="pt-4 lg:p-0">
          <Link
            href="/search"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Explore
          </Link>
        </li>
        <li className="pt-4 lg:p-0">
          <Link
            href="/meal-planner"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Meal Planner
          </Link>
        </li>
        <li className="pt-4 lg:p-0 lg:self-end">
          <Button
            className="text-sm w-full text-[#fff] bg-transparent text-black border hover:text-white hover:bg-black transition-all duration-200 ease-in-out"
            size="sm"
            onClick={async () => {
              try {
                setIsLoggingOut(true);
                await handleLogout(router);
              } catch (error) {
                console.log(error);
              } finally {
                setIsLoggingOut(false);
              }
            }}
          >
            {isLoggingOut && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoggingOut ? "Logging out" : "Logout"}
          </Button>
        </li>
      </ul>

      {/* Mobile Controls */}
      <div className="flex items-center space-x-8 lg:hidden">
        <Menu
          height={20}
          width={20}
          onClick={() => setShowNav(!showNav)}
          className={`cursor-pointer ml-3 transition-all duration-300 ease-in-out ${
            showNav && "hidden"
          }`}
        />
        <X
          height={20}
          width={20}
          onClick={() => setShowNav(!showNav)}
          className={` ml-3 transition-all duration-300 ease-in-out lg:hidden cursor-pointer ${
            !showNav && "hidden"
          }`}
        />
      </div>
    </nav>
  );
};

export default Navbar;
