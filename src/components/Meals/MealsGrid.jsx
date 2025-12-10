import MealCard from "../Shared/Mealcard/MealCard";

export default function MealsGrid({ meals }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {meals.map((meal) => (
        <MealCard key={meal._id} meal={meal} />
      ))}
    </div>
  );
}
