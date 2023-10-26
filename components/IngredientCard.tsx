import { IngredientPage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const IngredientCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8">
      {data?.pages.map((page: IngredientPage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
          key={id}
        >
          {page.results.map((ingredient) => (
            <div key={ingredient.id} className="rounded-md p-4 flex flex-col">
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
  );
};

export default IngredientCard;
