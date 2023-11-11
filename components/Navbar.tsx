"use client";

import Link from "next/link";
import { Loader2, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { handleLogout } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const Navbar = ({ user }: { user: User | undefined }) => {
  const [showNav, setShowNav] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  return (
    <nav className="w-[95%] lg:w-[90%] lg:w[396px] flex justify-between py-2 lg:py-0 mx-auto items-center">
      <Link href="/">Logo</Link>
      {/* Menu */}
      <ul
        className={`shadow-lg lg:shadow-none absolute w-full h-auto py-4 top-[3.55rem] left-0 bg-white space-y-2  px-4 lg:flex lg:relative lg:justify-between lg:items-center lg:space-x-16 lg:w-auto lg:top-0 lg:space-y-0 ${
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
            href="/shopping-list"
            className="text-sm text-[#4b4b4b] hover:text-black transition-all duration-200 ease-in-out"
            onClick={() => setShowNav(!showNav)}
          >
            Shopping List
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
      </ul>

      {/* Mobile Controls */}
      <div className="flex items-center space-x-8">
        <Link href="/search">
          <Search height={20} width={20} className="cursor-pointer" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`rounded-[100%] bg-blue-500 h-8 w-8 hover:bg-blue-500 focus:bg-blue-500`}
            >
              {user?.user_metadata?.user_name
                ? user?.user_metadata?.user_name.slice(0, 1).toUpperCase()
                : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>{user?.email}</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Update Username</DropdownMenuItem>
              <DropdownMenuItem>Update Email</DropdownMenuItem>
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuItem>Notification Preference</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
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
              {isLoggingOut && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isLoggingOut ? "Logging out" : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Menu
          height={20}
          width={20}
          onClick={() => setShowNav(!showNav)}
          className={`cursor-pointer ml-3 transition-all duration-300 ease-in-out lg:hidden ${
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
