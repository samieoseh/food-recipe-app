"use client";

import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <nav className="w-[95%] md:w-[90%] lg:w[396px] flex justify-between py-4 md:py-0 mx-auto items-center">
      <Link href="/">Logo</Link>
      {/* Menu */}
      <ul
        className={`shadow-md md:shadow-none absolute w-full h-auto py-4 top-[3.55rem] left-0 bg-white space-y-4  px-4 md:flex md:relative md:justify-between md:items-center md:space-x-24 md:w-auto md:top-0 md:space-y-0 ${
          !showNav && "hidden"
        }`}
      >
        <li className="md:p-0">
          <Link
            href="/home"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Home
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/my-profile"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            My Profile
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/my-recipe"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            My Recipe
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/dashboard"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Dashboard
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/shopping-list"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Shopping List
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
      </ul>

      {/* Mobile Controls */}
      <div className="flex items-center space-x-4">
        <Link href="/search">
          <Search height={20} width={20} className="cursor-pointer" />
        </Link>
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
          className={` ml-3 transition-all duration-300 ease-in-out md:hidden cursor-pointer ${
            !showNav && "hidden"
          }`}
        />
      </div>
    </nav>
  );
}
