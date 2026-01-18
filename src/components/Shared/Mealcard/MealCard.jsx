import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaSearchLocation } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import MealDetailsBtn from "../Button/MealDetailsBtn";
import axiosSecure from "../../../api/AxiosSecure";

const MealCard = ({ meal }) => {
  const { user } = useAuth();

  const addToFavorites = async (selectedMeal) => {
    try {
      const res = await axiosSecure.post("/favorites", {
        userEmail: user?.email,
        mealId: selectedMeal._id,
        mealName: selectedMeal.foodName,
        chefId: selectedMeal.chefId,
        chefName: selectedMeal.chefName,
        price: selectedMeal.price,
        foodImage: selectedMeal.foodImage,
        createdAt: new Date(),
      });

      if (res.data.alreadyExists) {
        toast.error("Already in Favorites!");
      } else {
        toast.success("Added to Favorites!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add favorite!");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative loved-card rounded-3xl shadow-lg overflow-hidden flex flex-col h-full group"
    >
      {/* Favorite */}
      <button
        onClick={() => addToFavorites(meal)}
        title="Add to favorites"
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 backdrop-blur hover:scale-110 transition"
      >
        <FaHeart className="text-red-500" size={18} />
      </button>

      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <motion.img
          src={meal.foodImage}
          alt={meal.foodName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Top info */}
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold leading-tight line-clamp-1">
              {meal.foodName}
            </h3>

            <div className="flex items-center gap-1 text-sm">
              <FaSearchLocation />
              <span>Dhaka</span>
            </div>
          </div>

          <p className="text-sm font-medium mb-1">
            Chef ID: {meal.chefId}
          </p>

          <p className="text-sm line-clamp-3 mb-3">
            {meal.foodDescription}
          </p>
        </div>

        {/* Bottom info */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-lg">
              ৳ {meal.price}
            </p>

            <span className="font-semibold flex items-center gap-1">
              ⭐ {meal.rating}
            </span>
          </div>

          <MealDetailsBtn mealId={meal._id} />
        </div>
      </div>
    </motion.div>
  );
};

export default MealCard;
