import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosSecure from '../api/AxiosSecure';

const useAddToFavorites = () => {
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const addToFavorites = async (meal, user) => {
    if (!user) {
      toast.error("Please login to add favorites!");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosSecure.post(`${API_URL}/favorites`, {
        userEmail: user.email,
        mealId: meal._id,
        mealName: meal.mealName,
        chefId: meal.chefId,
        chefName: meal.chefName,
        price: meal.foodPrice,
        foodImage: meal.foodImage,
      });

      if (res.data.alreadyExists) {
        toast.error("Already in Favorites!");
      } else {
        toast.success("Added to Favorites!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add favorite!");
    } finally {
      setLoading(false);
    }
  };

  return { addToFavorites, loading };
};

export default useAddToFavorites;