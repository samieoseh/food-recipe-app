"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export default function LandingNavbar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="w-[95%] md:w-[90%] flex justify-between py-4 md:py-0 mx-auto items-center">
      <Link href="/">Food Recipe</Link>

      {/* Menu */}
      <ul
        className={`shadow-md md:shadow-none absolute w-full h-auto py-4 top-[4rem] left-0  space-y-4  px-4 md:flex md:relative md:justify-between md:items-center md:space-x-24 md:w-auto md:top-0 md:space-y-0 z-20 ${
          !showNav && "hidden"
        }`}
      >
        <li className="md:p-0">
          <Link
            href="/"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Home
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Inventory Fridge
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/meal-planner"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Meal Planner
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Button
            className="md:hidden text-sm w-full transition-all duration-200 ease-in-out hover:bg-primary text-[#fff]"
            onClick={() => setShowNav(!showNav)}
            size="sm"
          >
            Get Started
          </Button>
        </li>
      </ul>

      {/* Mobile Controls */}
      <div className="flex items-center space-x-8">
        <Button
          className="hidden md:block text-[#fff] hover:bg-primary text-sm"
          size="sm"
          onClick={() => setShowNav(!showNav)}
        >
          Get Started
        </Button>
        <Menu
          height={20}
          width={20}
          onClick={() => setShowNav(!showNav)}
          className={`cursor-pointer ml-3 transition-all duration-300 ease-in-out md:hidden ${
            showNav && "hidden"
          }`}
        />
        <X
          height={20}
          width={20}
          onClick={() => setShowNav(!showNav)}
          className={` ml-3 transition-all duration-300 ease-in-out md:hidden ${
            !showNav && "hidden"
          }`}
        />
      </div>
    </nav>
  );
}
