import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router";

export default function TrendingMeals() {
  const [trendingMeals, setTrendingMeals] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await axios.get(`${API_URL}/orders`);
        console.log(res.data);
        
        // count total quantity per meal
        const countMap = {};

        res.data.forEach((order) => {
          const id = order.foodId;
          if (countMap[id]) {
            countMap[id].quantity += order.quantity; // sum total quantity
          } else {
            countMap[id] = {
              ...order,
              quantity: order.quantity, // initial quantity
            };
          }
        });

        // convert to array and sort by quantity
        const sorted = Object.values(countMap)
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 6);

        setTrendingMeals(sorted);
      } catch (err) {
        console.error("Failed to fetch trending meals:", err);
      }
    }

    fetchTrending();
  }, [API_URL]);

  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center">Trending Meals</h2>
      <p className="text-center mb-12 text-gray-500">
        Most ordered by our customers
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {trendingMeals.map((meal) => (
          <motion.div
            key={meal.foodId}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
            onClick={()=> navigate(`meals/${meal.foodId}`)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={meal.foodImage}
              alt={meal.mealName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{meal.mealName}</h3>
              <h6 className="text-sm">{meal.chefName}</h6>
              <div className="flex justify-between">
                
              <p className="mt-2 font-bold text-orange-600">৳ {meal.price}</p>
              <p className="mt-2 font-bold text-orange-600">⭐ {meal.foodRating}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
