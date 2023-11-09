import HydratedRecipeInformation from "@/components/HydratedRecipeInformation";

export default function RecipeInformationPage({
  params,
}: {
  params: { id: string };
}) {
  return <HydratedRecipeInformation id={params.id} />;
}
