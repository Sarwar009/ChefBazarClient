import React from 'react';
import { motion } from "framer-motion";
import { FaHeart, FaLocationArrow, FaSearchLocation} from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import MealDetailsBtn from '../Button/MealDetailsBtn';
import axiosSecure from '../../../api/AxiosSecure';

const MealCard = ({meal}) => {
  const {user} = useAuth();
  const BackenAPI = import.meta.env.VITE_API_URL;
  
const addToFavorites = async (selectedMeal) => {
  try {
    const res = await axiosSecure.post(`${BackenAPI}/favorites`, {
      userEmail: user.email,
      mealId: selectedMeal._id,
      mealName: selectedMeal.mealName,
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
              key={meal.id}
              whileHover={{ scale: 1.08 }}
              className="loved-card rounded-3xl shadow-lg overflow-hidden group flex flex-col transition-all duration-300 relative"
            >
            <button
                  className="absolute top-3 right-3 z-50 text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={() => addToFavorites(meal)}
                  title="add to favorites"
                >
                  <FaHeart size={24} />
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
                  <div className='flex justify-between'>
                    <h3 className="text-xl font-bold mb-1">
                    {meal.foodName}
                  </h3>
                  <p className='flex gap-2 items-center'><FaSearchLocation size='18'/><span>Dhaka</span></p>
                  </div>
                  <p className='font-bold'>ChefId : {meal.chefId}</p>
                  <p>{meal.foodDescription}</p>
                  <p className=" text-sm mb-2">{meal.chef}</p>
                  <div className="text-orange-600 font-bold text-lg mb-2 flex items-center justify-between mt-3">
                  
                    <p>৳ {meal.price}</p>
                    <span className="text-yellow-500 font-semibold ">
                    ⭐ {meal.rating}
                  </span>
                  </div>
                </div>
                  <MealDetailsBtn mealId={meal._id} />
              </div>
            </motion.div>
    );
}

export default MealCard;
