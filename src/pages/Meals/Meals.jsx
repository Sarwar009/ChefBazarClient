// MealsPage.jsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import MealDetailsBtn from "../../components/Shared/Button/MealDetailsBtn";
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
        {meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}
            className="relative bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer flex flex-col transition-all duration-300 group"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <motion.img
                src={meal.foodImage}
                alt={meal.mealName}
                className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent rounded-t-3xl"></div>

              {/* Chef Badge */}
              <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {meal.chefName}
              </div>

              {/* Delivery Badge */}
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                {meal.deliveryArea}
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{meal.mealName}</h3>
                <p className="text-gray-500 text-sm mb-2">Chef ID: {meal.chefId}</p>
                <div className="flex justify-between">
                  <p className="text-orange-600 font-bold text-lg mb-2">৳ {meal.foodPrice}</p>
                <p className="text-yellow-500 font-semibold">⭐ {meal.foodRating}</p>
                </div>
              </div>
              <MealDetailsBtn mealId={meal._id} />
                {/* <button
                onClick={() => handleDetails(meal._id)}
                className="mt-5 px-5 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
              >
                See Details
              </button> */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
