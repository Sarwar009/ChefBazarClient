import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import useAuth from "../../hooks/useAuth";
import MealCard from "../Shared/Mealcard/MealCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAddToFavorites from "../../hooks/useAddToFavorites";

export default function MostLovedFoods() {
  const [mostLoved, setMostLoved] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToFavorites } = useAddToFavorites();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await axios.get(`${API_URL}/meals`);
        

        const topFavorites = [...res.data]
          .sort((a, b) => b.foodRating - a.foodRating)
          .slice(0, 6);
        setMostLoved(topFavorites);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching most loved foods:", error);
        setLoading(false);
      }
    }
    fetchMeals();
  }, [API_URL]);

  

  const handleAddToFavorites = (meal) => {
    addToFavorites(meal, user);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <section className="py-8 px-4 max-w-6xl mx-auto">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Most Loved Foods
        </h2>
        <p className="text-center mb-12">
          Our users’ favorite meals that they can’t stop loving
        </p>
        <div className=" grid md:grid-cols-3 gap-8">
          {mostLoved.map((meal, idx) => (
            <motion.div
            key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.3 }}
            >
              <MealCard
                key={meal._id}
                meal={meal}
                addToFavorites={handleAddToFavorites}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
