import { RecipePage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const RecipeCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8">
      {data?.pages.map((page: RecipePage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
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
  );
};

export default RecipeCard;
