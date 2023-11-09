"use client";
import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType } from "@/types/typings";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import Card from "@/components/Card";

const FavoriteFilter = () => {
  const { favorites } = useAppContext() as AppContextType;
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filteredFavorites =
    selectedFilter === "All"
      ? favorites
      : favorites.filter(
          (favorite) => favorite.category === selectedFilter.toLowerCase()
        );
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="">
            <NavigationMenuTrigger className="text-xs border">
              {selectedFilter}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-48 p-2">
                <li
                  className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                    selectedFilter === "All" && "bg-secondary rounded"
                  }`}
                  onClick={() => setSelectedFilter("All")}
                >
                  <NavigationMenuLink className="text-xs">
                    All
                  </NavigationMenuLink>
                </li>
                <li
                  className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                    selectedFilter === "Recipe" && "bg-secondary rounded"
                  }`}
                  onClick={() => setSelectedFilter("Recipe")}
                >
                  <NavigationMenuLink className="text-xs">
                    Recipe
                  </NavigationMenuLink>
                </li>
                <li
                  className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                    selectedFilter === "Ingredients" && "bg-secondary rounded"
                  }`}
                  onClick={() => setSelectedFilter("Ingredient")}
                >
                  <NavigationMenuLink className="text-xs">
                    Ingredient
                  </NavigationMenuLink>
                </li>
                <li
                  className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                    selectedFilter === "Grocery Product" &&
                    "bg-secondary rounded"
                  }`}
                  onClick={() => setSelectedFilter("Grocery Product")}
                >
                  <NavigationMenuLink className="text-xs">
                    Grocery Product
                  </NavigationMenuLink>
                </li>
                <li
                  className={`p-2 focus:bg-accent hover:bg-accent rounded ${
                    selectedFilter === "Menu Item" && "bg-secondary rounded"
                  }`}
                  onClick={() => setSelectedFilter("Menu Item")}
                >
                  <NavigationMenuLink className="text-xs">
                    Menu Item
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-full mt-8 mx-auto md:grid md:grid-cols-3 flex flex-col gap-8">
        {filteredFavorites.map((favorite, id) => (
          <div key={id}>
            <Card
              category={favorite.category}
              id={favorite.item_id}
              image={favorite.image}
              title={favorite.title}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default FavoriteFilter;
