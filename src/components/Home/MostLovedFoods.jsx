import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import MealCard from "../Shared/Mealcard/MealCard";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAddToFavorites from "../../hooks/useAddToFavorites";

export default function MostLovedFoods() {
  const [mostLoved, setMostLoved] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useAuth();
  const { addToFavorites } = useAddToFavorites();

  const navigate = useNavigate();

  
   

  useEffect(() => {
  async function  fetchMeals() {
    try {
    const res = await axios.get(`${API_URL}/meals`)

    const topFavorites = [...res.data]
  .sort((a, b) => b.foodRating - a.foodRating)
  .slice(0, 4);
  setMostLoved(topFavorites);
  setLoading(false);
   } catch (error) {
    console.error("Error fetching most loved foods:", error);
    setLoading(false);
  }
  }
  fetchMeals();
 }, [API_URL]);
const handleOrder = (mealId) => {
  console.log("Order meal with ID:", mealId);
  navigate(`/order/${mealId}`);
  // Implement order functionality here
};

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
        <div className=" grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-8">
          {mostLoved.map((meal) => (
              <MealCard
            meal={meal}
            handleOrder={handleOrder}
            addToFavorites={handleAddToFavorites}
            />
          ))}

        </div>
      </div>
    </section>
  );
}
