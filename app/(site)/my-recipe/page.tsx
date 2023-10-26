"use client";
import Card from "@/components/Card";
import Container from "@/components/Container";
import { useAppContext } from "@/providers/AppContextProvider";
import { AppContextType } from "@/types/typings";

const MyRecipePage = () => {
  const { favorites } = useAppContext() as AppContextType;

  console.log(favorites);

  return (
    <Container className="mt-8">
      <div className="w-[80%] mx-auto md:grid md:grid-cols-3 flex flex-col gap-8">
        {favorites.map((favorite, id) => (
          <div key={id}>
            <Card
              category={favorite.category}
              id={favorite.item_id}
              image={favorite.image}
              title={favorite.title}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default MyRecipePage;
