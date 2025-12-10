// MealsPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from '../../components/Shared/Mealcard/MealCard'
import LoadingSpinner from "../../components/Shared/LoadingSpinner";


export default function MealsPage() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortAsc, setSortAsc] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
  async function loadData() {
    try {
      const mealRes = await axios.get(`${API_URL}/meals/`);
    console.log(mealRes.data);

      setMeals(mealRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error loading details:", err);
      setLoading(false);
    }
  }
  loadData();
}, [API_URL]);

  const handleSort = () => {
    const sorted = [...meals].sort((a, b) =>
      sortAsc ? a.price - b.price : b.price - a.price
    );
    setMeals(sorted);
    setSortAsc(!sortAsc);
  };

  

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Sort Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleSort}
          className="px-5 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all"
        >
          Sort by Price {sortAsc ? "↑" : "↓"}
        </button>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {meals.map((meal) => (
          <div key={meal._id}>
            <MealCard  meal={meal} mealId={meal._id}/>
          </div>
        ))}
      </div>
    </div>
  );
}
