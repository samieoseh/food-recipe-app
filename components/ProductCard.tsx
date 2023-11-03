import { ProductPage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const ProductCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8 -z-10">
      {data && data.pages.length > 0 ? (
        <div>
          {data.pages.map((page: ProductPage, id: number) => (
            <div
              className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-4"
              key={id}
            >
              {page.products.map((product) => (
                <div key={product.id} className=" rounded-md p-2 flex flex-col">
                  <Card
                    category="grocery product"
                    id={product.id}
                    image={product.image}
                    title={product.title}
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

export default ProductCard;
