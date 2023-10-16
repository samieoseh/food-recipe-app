"use client";
import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { Input } from "./ui/input";
import { LucideSearch, Menu, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);

  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = () => {
    const url = "/search?query=" + query;
    router.push(url);
  };

  return (
    <nav className="w-[95%] md:w-[90%] lg:w[396px] flex justify-between py-4 md:py-0 mx-auto items-center">
      <Link href="/" className="hidden md:block">
        Food Recipe
      </Link>
      <div className="flex w-auto items-center justify-center relative">
        <Input
          type="text"
          placeholder="Search..."
          className="w-[250px] md:w-[300px]"
          onChange={(e) => setQuery(e.target.value)}
        />
        <LucideSearch
          onClick={() => handleSearchSubmit()}
          height={20}
          width={20}
          className="mx-4 cursor-pointer absolute right-0 top-[24%]"
        />
      </div>
      {/* Menu */}
      <ul
        className={`shadow-md md:shadow-none absolute w-full h-auto py-4 top-[4rem] left-0 bg-white space-y-4  px-4 md:flex md:relative md:justify-between md:items-center md:space-x-24 md:w-auto md:top-0 md:space-y-0 ${
          !showNav && "hidden"
        }`}
      >
        <li className="md:p-0">
          <Link
            href="/"
            className="text-sm"
            onClick={() => setShowNav(!showNav)}
          >
            Home
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/"
            className="text-sm"
            onClick={() => setShowNav(!showNav)}
          >
            Inventory Fridge
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link
            href="/meal-planner"
            className="text-sm"
            onClick={() => setShowNav(!showNav)}
          >
            Meal Planner
          </Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link href="/" className="text-sm">
            Link 3
          </Link>
        </li>
      </ul>

      {/* Mobile Controls */}
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full w-[35px] h-[35px] bg-blue-500 text-white font-bold">
            S
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Samuel Oseh</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
