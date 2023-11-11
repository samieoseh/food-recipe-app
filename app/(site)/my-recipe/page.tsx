import Container from "@/components/Container";
import FavoriteFilter from "@/components/FavoriteFilter";

export default function MyRecipePage() {
  return (
    <Container className="mt-8">
      <div className="my-4">
        <h1 className="text-2xl">My Favorites</h1>
        <p className="text-sm py-2">
          Organize, Explore, and Enjoy Your Culinary Creations
        </p>
      </div>
      <FavoriteFilter />
    </Container>
  );
}
