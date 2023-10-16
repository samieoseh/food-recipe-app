import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType, IngredientPage, RecipePage } from "@/types/typings";
import { LucideHeart } from "lucide-react";
import Image from "next/image";
import { InfiniteData } from "@tanstack/react-query";

const IngredientCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  const { addFavorite, deleteFavorite, isFavorite } =
    useAppContext() as AppContextType;

  return (
    <div className="mt-8">
      {data?.pages.map((page: IngredientPage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
          key={id}
        >
          {page.results.map((ingredient, id: number) => (
            <div key={ingredient.id} className="rounded-md p-4 flex flex-col">
              <div className="w-full h-[200px] flex relative items-center justify-center">
                <Image
                  src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                  alt={ingredient.image}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-end py-2">
                <LucideHeart
                  fill={isFavorite(ingredient) ? "red" : "gray"}
                  height={15}
                  width={15}
                  strokeWidth={0}
                  onClick={() => {
                    if (isFavorite(ingredient)) {
                      // Item is already a favorite, so remove it
                      deleteFavorite(ingredient);
                    } else {
                      // Item is not a favorite, so add it
                      addFavorite(ingredient);
                    }
                  }}
                  className="animate-in transition-all duration-300 ease-in-out cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default IngredientCard;
