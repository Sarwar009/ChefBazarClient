import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import MealCard from "../Mealcard/MealCard";


export default function DailyMeals() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealRes = await axios.get(`${API_URL}/meals`);
        
        const sorted = mealRes.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,6);
        setMeals(sorted);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch meals:", err);
        setLoading(false);
      }
    };
    fetchMeals();
  }, [API_URL]);

  console.log(meals);
  

  if (loading) return <p className="text-center py-10">Loading meals...</p>;
  if (meals.length === 0) return <p className="text-center py-10">No meals available!</p>;

  console.log(meals, 'from daily meals');
  
  return (
    <section className="py-4 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Today's Special Meals
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {meals.map((meal, idx) => (
          <MealCard key={idx} meal={meal} />
        ))}
      </div>
    </section>
  );
}
