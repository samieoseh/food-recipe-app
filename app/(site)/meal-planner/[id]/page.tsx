export default function MealPlanDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id}</div>;
}
