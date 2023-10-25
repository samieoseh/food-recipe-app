import Container from "@/components/Container";
import { getFavorites } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const MyRecipePage = () => {
  // get all favorite recipes here
  const { data } = useQuery(["favorites"], async () => await getFavorites());

  return <Container>MyRecipePage</Container>;
};

export default MyRecipePage;
