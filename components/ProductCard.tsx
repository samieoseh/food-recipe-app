import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType, ProductPage } from "@/types/typings";
import { LucideHeart } from "lucide-react";
import Image from "next/image";
import { InfiniteData } from "@tanstack/react-query";

const ProductCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  const { addFavorite, deleteFavorite, isFavorite } =
    useAppContext() as AppContextType;

  return (
    <div className="mt-8">
      {data?.pages.map((page: ProductPage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
          key={id}
        >
          {page.products.map((product, id: number) => (
            <div key={product.id} className=" rounded-md p-2 flex flex-col">
              <div className="w-full h-[200px] flex relative items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between py-2">
                <p className="text-sm">
                  {product.title.length > 20
                    ? product.title.slice(0, 20) + "..."
                    : product.title}
                </p>
                <LucideHeart
                  fill={
                    isFavorite({
                      item_id: product.id,
                      category: "product",
                    })
                      ? "red"
                      : "gray"
                  }
                  height={15}
                  width={15}
                  strokeWidth={0}
                  onClick={() => {
                    if (
                      isFavorite({
                        item_id: product.id,
                        category: "product",
                      })
                    ) {
                      // Item is already a favorite, so remove it
                      deleteFavorite({
                        item_id: product.id,
                        category: "product",
                      });
                    } else {
                      // Item is not a favorite, so add it
                      addFavorite({
                        item_id: product.id,
                        category: "product",
                      });
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

export default ProductCard;
