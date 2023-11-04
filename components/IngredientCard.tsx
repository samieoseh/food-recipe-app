import { IngredientPage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const IngredientCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8 -z-10">
      {data && data.pages[0].results?.length > 0 ? (
        <div>
          {data.pages.map((page: IngredientPage, id: number) => (
            <div
              className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-4"
              key={id}
            >
              {page.results.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="rounded-md p-4 flex flex-col"
                >
                  <Card
                    category="ingredient"
                    id={ingredient.id}
                    image={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                    title={ingredient.name}
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

export default IngredientCard;
