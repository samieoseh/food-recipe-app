import { MenuPage } from "@/types/typings";
import { InfiniteData } from "@tanstack/react-query";
import Card from "./Card";

const MenuCard = ({ data }: { data: InfiniteData<any> | undefined }) => {
  return (
    <div className="mt-8">
      {data?.pages.map((page: MenuPage, id: number) => (
        <div
          className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8"
          key={id}
        >
          {page.menuItems.map((menu) => (
            <div key={menu.id} className=" rounded-md p-2 flex flex-col">
              <Card
                category="menu item"
                id={menu.id}
                image={menu.image}
                title={menu.title}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuCard;
