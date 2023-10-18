"use client";
import { handleSearchSubmit } from "@/lib/utils";
import { Button } from "./ui/button";
import { LucideSearch } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";

const SearchBar = ({ className }: { className?: string }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  return (
    <form
      className={`flex w-auto items-center justify-center relative ${className}`}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchSubmit(router, query);
      }}
    >
      <Input
        type="text"
        placeholder="Search..."
        className={`flex-1 w-[16rem] md:w-[22rem]
        pr-12 text-xs`}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant="link"
        className="text-[#999999] p-0 mr-4 no-underline cursor-pointer absolute right-0"
      >
        <LucideSearch height={20} width={20} />
      </Button>
    </form>
  );
};

export default SearchBar;
