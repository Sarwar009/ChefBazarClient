import React from 'react';

import { motion } from "framer-motion";
import { FaRegHeart} from 'react-icons/fa'
import MealDetailsBtn from '../Button/MealDetailsBtn'
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const MealCard = ({meal, handleOrder}) => {
  const {user} = useAuth();
  const BackenAPI = import.meta.env.VITE_API_URL;
    const addToFavorites = async (selectedMeal) => {
  try {
    const res = await axios.post(`${BackenAPI}/favorites`, {
      userEmail: user.email,
      mealId: selectedMeal._id,       // MongoDB meal id
      mealName: selectedMeal.mealName,
      chefId: selectedMeal.chefId,
      chefName: selectedMeal.chefName,
      price: selectedMeal.foodPrice,
      foodImage: selectedMeal.foodImage,
    });
    console.log(res.data);

    if (res.data.alreadyExists) {
      toast.error("Already in Favorites!");
    } else {
      toast.success("Added to Favorites!");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to add favorite!");
  }
}
  

    return (
        <motion.div
              key={meal.id}
              whileHover={{ scale: 1.08 }}
              className="loved-card bg-white rounded-3xl shadow-lg overflow-hidden group flex flex-col transition-all duration-300 relative"
            >
            <button
                  className="absolute top-3 right-3 z-50 text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => addToFavorites(meal)}
                  title="add to favorites"
                >
                  <FaRegHeart size={24} />
                </button>
              {/* Image with hover zoom */}
              <div className="relative h-56 w-full overflow-hidden">
                <motion.img
                  src={meal.foodImage}
                  alt={meal.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {meal.mealName}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">{meal.chef}</p>
                  <div className="text-orange-600 font-bold text-lg mb-2 flex items-center justify-between mt-3">
                  
                    <p>৳ {meal.foodPrice}</p>
                    <span className="text-yellow-500 font-semibold ">
                    ⭐ {meal.foodRating}
                  </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <MealDetailsBtn mealId={meal._id} />
                  <button 
                   onClick={()=> handleOrder(meal._id)}
                   className="mt-5 px-5 py-2 bg-linear-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-transform cursor-pointer">
                    Order
                  </button>
                </div>
              </div>
            </motion.div>
    );
}

export default MealCard;
