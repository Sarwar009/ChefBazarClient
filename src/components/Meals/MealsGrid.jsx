import MealCard from '../Shared/Mealcard/MealCard'

export default function MealsGrid({ meals = [] }) {
  if (!Array.isArray(meals) || meals.length === 0) {
    return <p className="text-center">No meals found</p>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal._id} meal={meal} />
      ))}
    </div>
  );
}
