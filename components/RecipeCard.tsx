import { RecipePage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const RecipeCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8">
      {data && data.pages[0].results?.length > 0 ? (
        <div>
          {data.pages.map((page: RecipePage, id: number) => (
            <div
              className="w-[100%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-4"
              key={id}
            >
              {page.results.map((recipe, id: number) => (
                <div key={recipe.id} className=" rounded-md p-2 flex flex-col">
                  <Card
                    category="recipe"
                    id={recipe.id}
                    image={recipe.image}
                    title={recipe.title}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col space-y-2">
          <h2 className="font-bold text-2xl">So Empty</h2>
          <h3 className="text-sm">Nothing to show</h3>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
