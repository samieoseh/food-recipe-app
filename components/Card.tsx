import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType, CardProps } from "@/types/typings";
import { LucideHeart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ConditionalRender from "./ConditionalRender";

const Card = ({ id, category, title, image }: CardProps) => {
  const { addFavorite, deleteFavorite, isFavorite } =
    useAppContext() as AppContextType;

  return (
    <div className="w-full">
      <ConditionalRender id={id} category={category}>
        {/* Conditionally render a Link if the category is a recipe otherwise a div */}
        <div className="w-full h-[200px] flex relative items-center justify-center">
          <Image
            src={image}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-lg"
          />
        </div>
      </ConditionalRender>
      <div className="flex justify-between py-2">
        <ConditionalRender id={id} category={category} className="text-sm">
          {title.length > 20 ? title.slice(0, 20) + "..." : title}
        </ConditionalRender>
        <LucideHeart
          fill={
            isFavorite({
              item_id: id,
              category: category,
              image: image,
              title: title,
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
                item_id: id,
                category: category,
                image: image,
                title: title,
              })
            ) {
              // Item is already a favorite, so remove it
              deleteFavorite({
                item_id: id,
                category: category,
                image: image,
                title: title,
              });
            } else {
              // Item is not a favorite, so add it
              addFavorite({
                item_id: id,
                category: category,
                image: image,
                title: title,
              });
            }
          }}
          className="animate-in transition-all duration-300 ease-in-out cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Card;
