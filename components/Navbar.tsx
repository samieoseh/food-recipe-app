import Link from "next/link";
import LogoutBtn from "./LogoutBtn";
import { Input } from "./ui/input";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="flex justify-between w-full py-4 items-center relative">
      <Link href="/" className="hidden md:block md:flex-1">
        Food Recipe
      </Link>
      <Input
        type="text"
        placeholder="Browse available recipes"
        className="md:hidden"
      />
      <ul
        className={`absolute w-full top-20 bg-white space-y-4 mx-auto md:flex md:relative md:top-0 md:space-y-0 md:w-auto md:items-center md:space-x-16 ${
          !showNav && "hidden"
        }`}
      >
        <li className="pt-4 md:p-0">
          <Link href="/">Link 1</Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link href="/">Link 2</Link>
        </li>
        <li className="pt-4 md:p-0">
          <Link href="/">Link 3</Link>
        </li>
        <li className="pt-4 md:p-0">
          <LogoutBtn />
        </li>
      </ul>
      <div
        className={`border p-2 rounded-full cursor-pointer ml-8 transition-all duration-300 ease-in-out md:hidden ${
          showNav && "hidden"
        }`}
      >
        <Menu height={20} width={20} onClick={() => setShowNav(!showNav)} />
      </div>
      <div
        className={`border p-2 rounded-full cursor-pointer ml-8 transition-all duration-300 ease-in-out md:hidden ${
          !showNav && "hidden"
        }`}
      >
        <X height={20} width={20} onClick={() => setShowNav(!showNav)} />
      </div>
    </div>
  );
}
