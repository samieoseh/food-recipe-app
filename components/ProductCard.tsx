import { ProductPage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const ProductCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8">
      {data?.pages.map((page: ProductPage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
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
  );
};

export default ProductCard;
