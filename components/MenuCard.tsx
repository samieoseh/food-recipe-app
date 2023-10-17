import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType, MenuPage, ProductPage } from "@/types/typings";
import { LucideHeart } from "lucide-react";
import Image from "next/image";
import { InfiniteData } from "@tanstack/react-query";

const MenuCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  const { addFavorite, deleteFavorite, isFavorite } =
    useAppContext() as AppContextType;

  return (
    <div className="mt-8">
      {data?.pages.map((page: MenuPage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
          key={id}
        >
          {page.menuItems.map((menu, id: number) => (
            <div key={menu.id} className=" rounded-md p-2 flex flex-col">
              <div className="w-full h-[200px] flex relative items-center justify-center">
                <Image
                  src={menu.image}
                  alt={menu.title}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between py-2">
                <p className="text-sm">
                  {menu.title.length > 20
                    ? menu.title.slice(0, 20) + "..."
                    : menu.title}
                </p>
                <LucideHeart
                  fill={isFavorite(menu) ? "red" : "gray"}
                  height={15}
                  width={15}
                  strokeWidth={0}
                  onClick={() => {
                    if (isFavorite(menu)) {
                      // Item is already a favorite, so remove it
                      deleteFavorite(menu);
                    } else {
                      // Item is not a favorite, so add it
                      addFavorite(menu);
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

export default MenuCard;
