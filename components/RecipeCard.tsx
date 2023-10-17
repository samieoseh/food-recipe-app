import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType, RecipePage } from "@/types/typings";
import { LucideHeart } from "lucide-react";
import Image from "next/image";
import { InfiniteData } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
const RecipeCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  const { addFavorite, deleteFavorite, isFavorite } =
    useAppContext() as AppContextType;
  const router = useRouter();
  return (
    <div className="mt-8">
      {data?.pages.map((page: RecipePage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
          key={id}
        >
          {page.results.map((recipe, id: number) => (
            <div
              key={recipe.id}
              className=" rounded-md p-2 flex flex-col"
              onClick={() => {
                const url = "/recipes/" + recipe.id;
                router.push(url);
              }}
            >
              <div className="w-full h-[200px] flex relative items-center justify-center">
                <Image
                  src={recipe.image}
                  alt={recipe.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between py-2">
                <p className="text-sm">
                  {recipe.title.length > 20
                    ? recipe.title.slice(0, 20) + "..."
                    : recipe.title}
                </p>
                <LucideHeart
                  fill={isFavorite(recipe) ? "red" : "gray"}
                  height={15}
                  width={15}
                  strokeWidth={0}
                  onClick={() => {
                    if (isFavorite(recipe)) {
                      // Item is already a favorite, so remove it
                      deleteFavorite(recipe);
                    } else {
                      // Item is not a favorite, so add it
                      addFavorite(recipe);
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

export default RecipeCard;
