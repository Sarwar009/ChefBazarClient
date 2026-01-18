import React, { useEffect, useState } from "react";
import MealCard from "../Mealcard/MealCard";
import axiosSecure from "../../../api/AxiosSecure";
import LoadingSpinner from "../LoadingSpinner";

export default function DailyMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await axiosSecure.get("/meals/latest");
        setMeals(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading)
    return <LoadingSpinner />;

  if (!meals.length)
    return <p className="text-center py-10">No meals available!</p>;

  return (
    <section className="py-4 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        Today's Special Meals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal._id} meal={meal} />
        ))}
      </div>
    </section>
  );
}
