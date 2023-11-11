import Container from "@/components/Container";
import Cuisine from "@/components/Cuisine";
import HydratedTrendingRecipe from "@/components/HydratedTrendingRecipe";
import SearchBar from "@/components/SearchBar";

export default function SearchPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#fff]  via-[#f9ebe9]  to-[#fff] py-8 ">
        <Container>
          <h1 className="text-3xl font-bold mb-2 text-primary">
            Welcome Back!
          </h1>
          <p className="text-sm">What do you want to cook today?</p>
          <SearchBar links={false} height={14} category="Recipes" />
        </Container>
      </div>
      <Container className="mt-4">
        <HydratedTrendingRecipe />
        <Cuisine />
      </Container>
    </>
  );
}
